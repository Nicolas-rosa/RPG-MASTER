import React, { useState, useEffect } from 'react'; // Importing useEffect
import { jsPDF } from 'jspdf';

const Creation = () => {
    const [name, setName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [race, setRace] = useState('');
    const [subRace, setSubRace] = useState('');
    const [level, setLevel] = useState(1);
    const [attributes, setAttributes] = useState({
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
    });
    const [skills, setSkills] = useState([]);
    const [method, setMethod] = useState('standard'); // 'standard', 'roll', 'pointBuy'
    const [background, setBackground] = useState('');
    const [visualTraits, setVisualTraits] = useState({ hairColor: '', eyeColor: '', otherTraits: '' });
    
    // State for Point Buy
    const [pointsAvailable, setPointsAvailable] = useState(27);
    const [pointBuyAttributes, setPointBuyAttributes] = useState({
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8,
    });

    const races = {
        Aarakocra: { bonuses: { dexterity: 2, wisdom: 1 } },
        Aasimar: { bonuses: { charisma: 2 }, subRaces: ['Protector Aasimar', 'Scourge Aasimar', 'Fallen Aasimar'] },
        Bugbear: { bonuses: { strength: 2, dexterity: 1 } },
        Centaur: { bonuses: { strength: 2, wisdom: 1 } },
        Changeling: { bonuses: { charisma: 2, intelligence: 1 } },
        DeepGnome: { bonuses: { dexterity: 1, intelligence: 2 } }, // Also known as Svirfneblin
        Dragonborn: {
            bonuses: { strength: 2, charisma: 1 },
            subRaces: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White']
        },
        Drow: { bonuses: { dexterity: 2, charisma: 1 } },
        Dwarf: { bonuses: { constitution: 2 }, subRaces: ['Mountain Dwarf', 'Hill Dwarf', 'Duergar'] },
        Elf: { bonuses: { dexterity: 2 }, subRaces: ['Eladrin', 'High Elf', 'Wood Elf', 'Sea Elf', 'Shadar-kai', 'Drow'] },
        Firbolg: { bonuses: { wisdom: 2, strength: 1 } },
        Genasi: {
            subRaces: ['Air', 'Earth', 'Fire', 'Water'],  // Just list the subrace names
            Air: { bonuses: { constitution: 2, dexterity: 1 } }, // Nest the subraces with their stats
            Earth: { bonuses: { strength: 2, constitution: 1 } },
            Fire: { bonuses: { constitution: 2, intelligence: 1 } },
            Water: { bonuses: { wisdom: 2, constitution: 1 } }
        },
        Gith: {
            subRaces: ['Githyanki', 'Githzerai'],
            Githyanki: { bonuses: { strength: 2, intelligence: 1 } },
            Githzerai: { bonuses: { wisdom: 2, strength: 1 } }
        },
        Gnome: { bonuses: { intelligence: 2 }, subRaces: ['Forest Gnome', 'Rock Gnome', 'Deep Gnome'] },
        Goblin: { bonuses: { dexterity: 2, constitution: 1 } },
        Goliath: { bonuses: { strength: 2, constitution: 1 } },
        HalfElf: { bonuses: { charisma: 2, plusTwoOtherStats: true } }, // Simpler naming
        HalfOrc: { bonuses: { strength: 2, constitution: 1 } }, // Simpler naming
        Halfling: { bonuses: { dexterity: 2 }, subRaces: ['Lightfoot', 'Stout'] },
        Hobgoblin: { bonuses: { constitution: 2, intelligence: 1 } },
        Human: { bonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 }, subRaces: ['Variant Human'] },
        Kenku: { bonuses: { dexterity: 2, wisdom: 1 } },
        Kobold: { bonuses: { dexterity: 2, strength: -2 } },
        Lizardfolk: { bonuses: { constitution: 2, wisdom: 1 } },
        Loxodon: { bonuses: { wisdom: 2, constitution: 1 } },
        Minotaur: { bonuses: { strength: 2, constitution: 1 } },
        Orc: { bonuses: { strength: 2, constitution: 1 } },
        Shifter: { bonuses: { dexterity: 1 }, subRaces: ['Beasthide', 'Longtooth', 'Swiftstride', 'Wildhunt'] },
        Tabaxi: { bonuses: { dexterity: 2, charisma: 1 } },
        Tiefling: {
            bonuses: { intelligence: 1, charisma: 2 },
            subRaces: ['Asmodeus', 'Baalzebul', 'Dispater', 'Fierna', 'Glasya', 'Levistus', 'Mammon', 'Mephistopheles', 'Zariel']
        },
        Tortle: { bonuses: { strength: 2, wisdom: 1 } },
        Triton: { bonuses: { strength: 1, constitution: 1, charisma: 1 } },
        Warforged: { bonuses: { constitution: 2, plusOneOtherStat: true } },
        YuantiPureblood: { bonuses: { charisma: 2, intelligence: 1 } } // Simpler naming
    };

    const classes = {
        Artificer: { primary: 'Intelligence', secondary: 'Constitution', description: 'A master of invention, crafting magical devices and infusions.' },
        Barbarian: { primary: 'Strength', secondary: 'Constitution', description: 'A fierce warrior who taps into primal rage for incredible power.' },
        Bard: { primary: 'Charisma', secondary: 'Dexterity', description: 'A charismatic performer who uses magic and music to inspire and manipulate.' },
        Cleric: { primary: 'Wisdom', secondary: 'Constitution', description: 'A devout follower of a deity, channeling divine power to heal and protect.' },
        Druid: { primary: 'Wisdom', secondary: 'Constitution', description: 'A guardian of nature, wielding the power of the wilds and shapeshifting into animals.' },
        Fighter: { primary: 'Strength' , secondary: 'Constitution', description: 'A skilled warrior, trained in a variety of combat styles.' },
        Monk: { primary: 'Dexterity', secondary: 'Wisdom', description: 'A disciplined martial artist, harnessing ki for supernatural abilities.' },
        Paladin: { primary: 'Strength', secondary: 'Charisma', description: 'A holy warrior, sworn to uphold justice and righteousness.' },
        Ranger: { primary: 'Dexterity', secondary: 'Wisdom', description: 'A skilled tracker and survivalist, adept at both ranged and melee combat.' },
        Rogue: { primary: 'Dexterity', secondary: 'Intelligence', description: 'A cunning and stealthy character, specializing in trickery and infiltration.' },
        Sorcerer: { primary: 'Charisma', secondary: 'Constitution', description: 'A wielder of innate magic, drawing power from an internal source.' },
        Warlock: { primary: 'Charisma', secondary: 'Constitution', description: 'A seeker of forbidden knowledge, making pacts with powerful entities for magical abilities.' },
        Wizard: { primary: 'Intelligence', secondary: 'Wisdom', description: 'A scholar of arcane magic, studying spells and mastering the elements.' }
    };

    useEffect(() => {
        // Update attributes based on level whenever level or race changes
        updateAttributesWithLevel();
    }, [level, race]); // Dependencies: level and race

    const handleRaceChange = (event) => {
        const selectedRace = event.target.value;
        setRace(selectedRace);
        applyRaceBonuses(selectedRace);
    };

    const handleSubRaceChange = (event) => {
        setSubRace(event.target.value);
        // Here you can apply specific sub-race bonuses if necessary.
    };

    const handleClassChange = (event) => {
        setCharacterClass(event.target.value);
    };

    const applyRaceBonuses = (selectedRace) => {
        const bonuses = races[selectedRace]?.bonuses || {};
        setAttributes((prev) => ({
            strength: prev.strength + (bonuses.strength || 0),
            dexterity: prev.dexterity + (bonuses.dexterity || 0),
            constitution: prev.constitution + (bonuses.constitution || 0),
            intelligence: prev.intelligence + (bonuses.intelligence || 0),
            wisdom: prev.wisdom + (bonuses.wisdom || 0),
            charisma: prev.charisma + (bonuses.charisma || 0),
        }));
    };

    const updateAttributesWithLevel = () => {
        // Update attributes based on level
        setAttributes((prev) => ({
            strength: prev.strength + Math.floor(level / 2), // Example: +1 every 2 levels
            dexterity: prev.dexterity + Math.floor(level / 2),
            constitution: prev.constitution + Math.floor(level / 2),
            intelligence: prev.intelligence + Math.floor(level / 2),
            wisdom: prev.wisdom + Math.floor(level / 2),
            charisma: prev.charisma + Math.floor(level / 2),
        }));
    };

    const calculateModifier = (value) => Math.floor((value - 10) / 2);

    const handleMethodChange = (event) => {
        const newMethod = event.target.value;
        setMethod(newMethod);

        // Apply attribute distribution logic based on the selected method
        if (newMethod === 'standard') {
            setAttributes({
                strength: 15,
                dexterity: 14,
                constitution: 13,
                intelligence: 12,
                wisdom: 10,
                charisma: 8,
            });
        } else if (newMethod === 'roll') {
            const rollStats = () => {
                let rolls = [];
                for (let i = 0; i < 4; i++) {
                    rolls.push(Math.floor(Math.random() * 6) + 1);
                }
                rolls.sort((a, b) => b - a); // Sort descending to remove the lowest
                rolls.pop(); // Remove the lowest value
                return rolls.reduce((sum, roll) => sum + roll, 0);
            };

            setAttributes({
                strength: rollStats(),
                dexterity: rollStats(),
                constitution: rollStats(),
                intelligence: rollStats(),
                wisdom: rollStats(),
                charisma: rollStats(),
            });
        } else if (newMethod === 'pointBuy') {
            setPointsAvailable(27); // Reset available points
            setPointBuyAttributes({
                strength: 8,
                dexterity: 8,
                constitution: 8,
                intelligence: 8,
                wisdom: 8,
                charisma: 8,
            });
            setAttributes(pointBuyAttributes); // Set initial attributes for point buy
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const doc = new jsPDF();

        // Setting the background
        doc.setFillColor(255, 239, 204);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

        // PDF Title
        doc.setFont("times", "bold");
        doc.setFontSize(24);
        doc.setTextColor(102, 51, 0);
        doc.text("Character Sheet", 10, 20);

        // Adding character details
        doc.setFontSize(14);
        doc.setFont("times", "normal");
        doc.setTextColor(51, 51, 51);
        doc.text(`Name: ${name}`, 10, 40);
        doc.text(`Race: ${race}`, 10, 50);
        if (subRace) {
            doc.text(`Sub-race: ${subRace}`, 10, 60);
        }
        doc.text(`Class: ${characterClass}`, 10, 70);
        doc.text(`Description: ${classes[characterClass]?.description || ''}`, 10, 80); 
        doc.text(`Level: ${level}`, 10, 90);
        doc.text(`Strength: ${attributes.strength} (Mod: ${calculateModifier(attributes.strength)})`, 10, 100);
        doc.text(`Dexterity: ${attributes.dexterity} (Mod: ${calculateModifier(attributes.dexterity)})`, 10, 110);
        doc.text(`Constitution: ${attributes.constitution} (Mod: ${calculateModifier(attributes.constitution)})`, 10, 120);
        doc.text(`Intelligence: ${attributes.intelligence} (Mod: ${calculateModifier(attributes.intelligence)})`, 10, 130);
        doc.text(`Wisdom: ${attributes.wisdom} (Mod: ${calculateModifier(attributes.wisdom)})`, 10, 140);
        doc.text(`Charisma: ${attributes.charisma} (Mod: ${calculateModifier(attributes.charisma)})`, 10, 150);
        doc.text(`Skills: ${skills.join(', ')}`, 10, 160);
        doc.text(`Background: ${background}`, 10, 170);
        doc.text(`Appearance: Hair: ${visualTraits.hairColor}, Eyes: ${visualTraits.eyeColor}, Others: ${visualTraits.otherTraits}`, 10, 180);

        // Adding a decorative border
        doc.setDrawColor(102, 51, 0);
        doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);

        // Footer with a quote or motto
        doc.setFontSize(10);
        doc.setTextColor(102, 51, 0);
        doc.text("May the wisdom of the ancients guide your steps.", 10, doc.internal.pageSize.getHeight() - 10);

        // Saving the PDF
        doc.save(`${name}_Character_Sheet.pdf`);
    };

    return (
        <div className="bg-gray-900 p-6 md:p-8 rounded-lg shadow-lg border border-gray-700 w-[70vw] mt-[5vh]">
            <h1 className="text-[120%] text-yellow-400 font-bold text-center mb-6 font-serif text-shadow-lg">
                Create Your Character
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter name"
                    className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                />

                {/* Race */}
                <fieldset className="mb-4 border border-gray-600 p-3 rounded bg-gray-800">
                    <legend className="block text-gray-300 mb-2 font-semibold">Race:</legend>
                    {Object.keys(races).map((raceOption) => (
                        <label key={raceOption} className="relative text-amber-500 hover:text-yellow-300 flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value={raceOption}
                                checked={race === raceOption}
                                onChange={handleRaceChange}
                                className="sr-only peer" />
                            <div
                                className="w-4 h-4 mr-1 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                            ></div>
                            {raceOption}
                        </label>
                    ))}
                </fieldset>

                {/* Sub-race */}
                {race && races[race].subRaces && (
                    <fieldset className="mb-4 border border-gray-600 p-3 rounded bg-gray-800">
                        <legend className="block text-gray-300 mb-2 font-semibold">Sub-race:</legend>
                        {races[race].subRaces.map((subRaceOption) => (
                            <label key={subRaceOption} className="relative text-amber-500 hover:text-yellow-300 flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value={subRaceOption}
                                    checked={subRace === subRaceOption}
                                    onChange={handleSubRaceChange}
                                    className="sr-only peer" />
                                <div
                                    className="w-4 h-4 mr-1 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                                ></div>
                                {subRaceOption}
                            </label>
                        ))}
                    </fieldset>
                )}

                {/* Class */}
                <fieldset className="mb-4 border border-gray-600 p-3 rounded bg-gray-800">
                    <legend className="block text-gray-300 mb-2 font-semibold">Class:</legend>
                    {Object.keys(classes).map((classOption) => (
                        <label key={classOption} className="relative text-amber-500 hover:text-yellow-300 flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value={classOption}
                                checked={characterClass === classOption}
                                onChange={handleClassChange}
                                className="sr-only peer" />
                            <div
                                className="w-4 h-4 mr-1 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                            ></div>
                            {classOption}
                        </label>
                    ))}
                </fieldset>

                {/* Level */}
                <label htmlFor="level" className="block text-gray-300 mb-2 font-semibold">
                    Level:
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        min="1"
                        required
                        className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                    />
                </label>

                {/* Attribute Distribution Method */}
                <fieldset className="mb-4 border border-gray-600 p-3 rounded bg-gray-800">
                    <legend className="block  text-amber-500  mb-2 font-semibold">Attribute Distribution Method:</legend>
                    <label className="relative text-amber-500 hover:text-yellow-300 flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="standard"
                            checked={method === 'standard'}
                            onChange={handleMethodChange}
                            className="sr-only peer" />
                        <div
                            className="w-4 h-4 mr-1 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                        ></div>
                        Standard Array (15, 14, 13, 12, 10, 8)
                    </label>
                    <label className="relative text-amber-500 hover:text-yellow-300 flex items-center cursor-pointer">
                        <input
                            type="radio"
                            value="roll"
                            checked={method === 'roll'}
                            onChange={handleMethodChange}
                            className="sr-only peer" />
                        <div
                            className="w-4 h-4 mr-1 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                        ></div>
                        Dice Rolling (4d6 dropping the lowest)
                    </label>
                </fieldset>

                {/* Skills */}
                <label htmlFor="skills" className="block text-gray-300 mb-4 font-semibold">
    Skills:
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {["Acrobatics", "Arcana", "Athletics", "Deception", "History", "Intimidation", "Insight", "Investigation", "Medicine", "Perception", "Persuasion", "Survival"].map(skill => (
            <label key={skill} className="flex items-center">
                <input
                    type="checkbox"
                    value={skill}
                    checked={skills.includes(skill)}
                    onChange={(e) => {
                        const newSkills = e.target.checked
                            ? [...skills, skill]
                            : skills.filter(s => s !== skill);
                        setSkills(newSkills);
                    }}
                    className="sr-only peer" />
                <div
                    className="w-5 h-5 mr-2 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                ></div>
                <span className="text-sm md:text-base">{skill}</span> {/* Ajustando o tamanho do texto */}
            </label>
        ))}
    </div>
</label>

                {/* Background */}
                <label htmlFor="background" className="block text-gray-300 mb-2 font-semibold">
                    Background:
                    <textarea
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        placeholder="Tell your character's story"
                        className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                    />
                </label>

                {/* Visual Customization */}
                <label htmlFor="visualTraits" className="block text-gray-300 mb-2 font-semibold">
                    Visual Customization:
                    <input
                        type="text"
                        placeholder="Hair color"
                        value={visualTraits.hairColor}
                        onChange={(e) => setVisualTraits({ ...visualTraits, hairColor: e.target.value })}
                        className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Eye color"
                        value={visualTraits.eyeColor}
                        onChange={(e) => setVisualTraits({ ...visualTraits, eyeColor: e.target.value })}
                        className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Other traits"
                        value={visualTraits.otherTraits}
                        onChange={(e) => setVisualTraits({ ...visualTraits, otherTraits: e.target.value })}
                        className="block w-full p-2 bg-gray-800 text-gray-200 border-b border-gray-600 focus:border-b-2 focus:border-yellow-400 transition-colors focus:outline-none"
                    />
                </label>

                <button type="submit" className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Generate PDF
                </button>
            </form>
        </div>
    );
};

export default Creation;