import React from 'react';

const Inforaces = () => {
    return (
        <main className="min-h-screen bg-gray-900 text-gray-300 px-4 py-8 relative flex flex-col items-center">
            <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-gray-900 z-[-1]" aria-hidden="true"></div>

            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl text-amber-500 font-bold mb-6 shadow-lg" id="dnd-overview-heading">
                    Lesser-Known Races and Classes in Dungeons & Dragons
                </h1>

                <p className="text-xl md:text-2xl leading-relaxed mb-8 text-yellow-400">
                    Dungeons & Dragons features a rich variety of races and classes that allow players to customize their characters in unique ways. Each race offers distinct abilities and traits, while classes define the character's capabilities and role within the party.
                </p>

                <h2 className="text-3xl md:text-5xl text-amber-500 font-bold mb-6">Lesser-Known Races</h2>

                <ul className="list-disc list-inside mb-8 text-xl md:text-2xl leading-relaxed">
                    <li><strong>Genasi:</strong> Descendants of elemental beings, Genasi embody the power of air, earth, fire, or water, granting them unique elemental abilities.</li>
                    <li><strong>Tabaxi:</strong> Cat-like humanoids known for their agility and curiosity, Tabaxi are often wanderers and adventurers.</li>
                    <li><strong>Goliath:</strong> Mountain-dwelling giants known for their strength and resilience, Goliaths are often nomadic and value competition.</li>
                    <li><strong>Shifter:</strong> Shape-shifters who can take on animalistic traits, Shifters are often connected to nature and have a primal instinct.</li>
                    <li><strong>Warforged:</strong> Living constructs created for war, Warforged possess a unique blend of mechanical and organic traits, making them resilient and versatile.</li>
                    <li><strong>Changeling:</strong> Shape-shifters who can alter their appearance at will, Changelings often navigate the world in disguise, making them excellent spies.</li>
                </ul>

                <h2 className="text-3xl md:text-5xl text-amber-500 font-bold mb-6">Lesser-Known Classes</h2>

                <ul className="list-disc list-inside mb-8 text-xl md:text-2xl leading-relaxed">
                    <li><strong>Artificer:</strong> Masters of invention and magic, Artificers create magical items and use technology to enhance their abilities.</li>
                    <li><strong>Blood Hunter:</strong> Warriors who harness the power of their own blood to fuel their abilities, Blood Hunters are often driven by vengeance.</li>
                    <li><strong>Ranger (Beast Master):</strong> Rangers who form a close bond with a beast companion, working together to overcome challenges in the wild.</li>
                    <li><strong>Arcane Archer:</strong> Archers who blend martial prowess with arcane magic, using enchanted arrows to gain an edge in combat.</li>
                    <li><strong>Shadow Monk:</strong> Monks who specialize in stealth and deception, using their agility to strike from the shadows.</li>
                    <li><strong>Oath of the Ancients Paladin:</strong> Paladins who draw power from nature and the light, protecting the natural world and its creatures.</li>
                </ul>

                <p className="text-xl md:text-2xl leading-relaxed mb-8">
                    Choosing a lesser-known race and class can provide a unique experience in D&D, allowing players to explore different synergies and create characters that stand out in combat, magic, or social interactions.
                </p>

              
            </div>

            {/* Meta Tags for SEO */}
            <meta name="description" content="Explore lesser-known races and classes in Dungeons & Dragons, a legendary RPG that combines creativity, strategy, and storytelling." />
            <meta name="keywords" content="Dungeons & Dragons, races, classes, RPG, role-playing game" />
            <meta name="robots" content="index, follow" />
        </main>
    );
};

export default Inforaces;