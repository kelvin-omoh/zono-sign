import { useState } from 'react'

const NameInput = ({ onNext, formData, updateFormData }) => {
    const [name, setName] = useState(formData.name || '')

    const handleNameChange = (e) => {
        const value = e.target.value
        setName(value)
        updateFormData('name', value)
    }

    const handleNext = () => {
        if (name.trim()) {
            onNext()
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center">
            {/* Header */}
            <div className="flex-1 p-6 lg:p-12 pt-24 lg:pt-12 max-w-2xl mx-auto w-full">
                <div className="text-center lg:text-left mb-8 lg:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                        Welcome to ZonoSign
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl">
                        Create your profile to start lessons
                    </p>
                </div>

                {/* Name Input */}
                <div className="mb-8 lg:mb-12">
                    <label htmlFor="name" className="block text-sm lg:text-base font-medium text-gray-700 mb-3 lg:mb-4">
                        Enter Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Prima"
                        className={`w-full p-4 lg:p-6 border-2 rounded-xl lg:rounded-2xl focus:outline-none transition-colors duration-200 text-base lg:text-lg ${name
                            ? 'border-teal-500 focus:border-teal-500'
                            : 'border-gray-200 focus:border-teal-500'
                            }`}
                    />
                </div>

                {/* Next Button */}
                <div className="max-w-md mx-auto w-full lg:max-w-lg">
                    <button
                        onClick={handleNext}
                        disabled={!name.trim()}
                        className={`w-full py-4 px-6 rounded-xl lg:rounded-2xl font-semibold text-lg lg:text-xl transition-all duration-200 ${name.trim()
                            ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NameInput 