import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, children, ...rest }) => {
    const Component = to ? Link : 'button';
    return (
        <Component
            to={to}
             className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
             
                
            {...rest}
        >
            {children}
        </Component>
    );
};

const Home = () => {
    return (
        <main className="min-h-screen bg-gray-900 text-gray-300 px-4 py-8 relative flex flex-col items-center justify-center">
            <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-gray-900 z-[-1]" aria-hidden="true"></div>

            <h1 className="text-4xl md:text-6xl text-amber-500 font-bold mb-4 shadow-lg" id="welcome-heading">
                Welcome to RPG Master
            </h1>

            <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8 text-yellow-400">
                This Website is made for Improve your build RPG character Process
            </p>
          
            <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8">
               <strong className='text-red-600'>INFO</strong> : To know more about the classes, Races and Equipaments <br /> <br />
               <strong className='text-red-600'>Create</strong> : To Build an RPG character <br /> <br />
               <strong className='text-red-600'>CONTACT</strong> : To give me your Feedback and Know Who made This Website
            </p>


            <Button to="/Info">Begin Your Journey</Button>
        </main>
    );
};

export default Home;