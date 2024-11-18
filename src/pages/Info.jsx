import axios from "axios";
import React, { useEffect, useState } from "react";

const Detail = ({ item, onClose, dataType }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-md shadow-md absolute top-0 left-0 w-full z-10">
            <h2 className="text-2xl font-bold mb-2 text-amber-400">{item.name}</h2>
            {item.desc && <p>{item.desc.join('\n')}</p>}
            {item.equipment_category && <p><strong>Category:</strong> {item.equipment_category.name}</p>}
            {item.cost && <p><strong>Cost:</strong> {item.cost.quantity} {item.cost.unit}</p>}
            {dataType === 'races' && (
                <>
                    <p><strong>Size:</strong> {item.size}</p>
                    <p><strong>Speed:</strong> {item.speed}</p>
                </>
            )}
            {dataType === 'classes' && (
                <>
                    <p><strong>Hit Dice:</strong> {item.hit_die}</p>
                </>
            )}
            {dataType === 'equipment' && item.weapon_range && (
                <p><strong>Range:</strong> {item.weapon_range}</p>
            )}
            {dataType === 'equipment' && item.damage && (
                <p><strong>Damage:</strong> {item.damage.damage_dice} {item.damage.damage_type.name}</p>
            )}
            <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
    );
};

const Info = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataType, setDataType] = useState('races');
    const apiEndpoints = {
        races: 'races',
        classes: 'classes',
        equipment: 'equipment',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = {};
                for (const dataType in apiEndpoints) {
                    const response = await axios.get(`https://www.dnd5eapi.co/api/${apiEndpoints[dataType]}`);
                    results[dataType] = response.data.results;
                }
                setData(results);
            } catch (error) {
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchItemDetails = async (index, currentDataType) => {
        try {
            const response = await axios.get(`https://www.dnd5eapi.co/api/${currentDataType}/${index}`);
            setSelectedItem(response.data);
        } catch (error) {
            setError(`Item not found or API error for ${currentDataType}`);
            setSelectedItem(null);
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleDataTypeChange = (e) => {
        setDataType(e.target.value);
        setSearchTerm('');
        setSelectedItem(null);
    };

    const filteredData = data[dataType] ? data[dataType].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (loading) {
        return (
            <div className="text-center mt-[10%] w-full h-full bg-slate-900">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Your adventure is about to begin</p>
            </div>
        );
    }
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen justify-center content-center text-center items-center p-4">
            <h1 className="text-3xl font-bold mb-4 text-amber-500">D&D Infos</h1>
            <div className="flex mb-4">
                <select
                    value={dataType}
                    onChange={handleDataTypeChange}
                    className="bg-gray-800 border border-gray-700 px-2 py-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
                >
                    {Object.keys(apiEndpoints).map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={`Search for ${dataType}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="bg-gray-800 border border-gray-700 px-2 py-1 rounded-r-md ml-2 sm:ml-0 w-full sm:w-auto mt-2 sm:mt-0"
                />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 relative justify-center content-center text-center items-center">
                {filteredData.map((item) => (
                    <li
                        key={item.index}
                        className="bg-gray-800 text-center m-auto p-3 w-[80%] rounded-md hover:bg-red-700 relative cursor-pointer"
                        onClick={() => {
                            if (selectedItem && selectedItem.index === item.index) {
                                setSelectedItem(null); // Close if already selected
                            } else {
                                fetchItemDetails(item.index, dataType); // Open details
                            }
                        }}
                    >
                        <h2 className="text-xl font-semibold text-amber-300 hover:text-amber-200">
                            {item.name}
                        </h2>
                        {selectedItem && selectedItem.index === item.index && (
                            <Detail item={selectedItem} onClose={() => setSelectedItem(null)} dataType={dataType} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Info;