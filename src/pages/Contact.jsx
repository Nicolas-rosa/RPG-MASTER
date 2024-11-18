
function Contact() {


return (
    <div className="max-w-[80vw] mx-auto p-6 bg-gray-900 shadow-md rounded-lg mt-10 bg-opacity-90 border border-gray-700 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-500">Welcome, Traveler!</h2>
        <div className="flex flex-col items-center">
            <div className="relative flex justify-center mb-6">
                <img
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-top object-cover rounded-full border-4 border-yellow-500"
                    src="https://i.ibb.co/X5v1mRh/Whats-App-Image-2024-06-08-at-21-41-41.jpg"
                    alt="Profile picture of a dark fantasy character with a mysterious aura"
                />
                <div className="absolute top-0 right-[-20%] flex flex-col items-center space-y-2 md:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <img src="https://vitejs.dev/logo.svg" alt="Vite logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                </div>
            </div>
            <p className="text-lg text-gray-300 mb-6 text-center px-4 md:px-0">
            I am Nicolas Rosa, the artificer of this digital realm. I am a passionate web developer who loves creating beautiful and functional web applications. I have experience in various web technologies and enjoy learning new things every day.            </p>
        </div>
        <div className="flex space-x-4 mb-6 justify-center">
            <a href="https://github.com/Nicolas-rosa" target="_blank" className="text-gray-300 hover:text-amber-400">
                <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="mailto:nicolasfrancacastrorosa@gmail.com" target="_blank" className="text-gray-300 hover:text-amber-400">
                <i className="fas fa-envelope fa-2x"></i>
            </a>
            <a href="https://www.linkedin.com/in/nicolas-rosa-dev" target="_blank" className="text-gray-300 hover:text-amber-400">
                <i className="fab fa-linkedin fa-2x"></i>
            </a>
        </div>
      

    </div>
);
}

export default Contact