import React from 'react'

const contact = () => {
    return (
        <>


            <footer className="bg-white text-gray-700 p-8 shadow-md rounded-2xl mx-4 md:mx-8 my-10">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    {/* Left Section */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">Vital Link</h2>
                        <p className="mt-2">
                            VitalLink bridges your health with technology — never miss a dose with smart pill <br /> reminders, get quick answers from our AI health assistant, and securely <br /> share your medical info via downloadable QR codes.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">Quick link</h3>
                        <a href="#home" className="hover:text-black">Home</a>
                        <a href="#about" className="hover:text-black">About</a>
                        <a href="#contact" className="hover:text-black">Contact</a>

                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">Contact us</h3>
                        <p>Kathmandu, Nepal</p>
                        <p>+123-456-789</p>
                        <p>vitalLink09@gmail.com</p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-300" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-2">
                    <p>© 2025 vitalLinks. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-black">Privacy Policy</a>
                        <a href="#" className="hover:text-black">Terms of Service</a>
                        <a href="#" className="hover:text-black">Cookies Settings</a>
                    </div>
                </div>
            </footer>



        </>
    )
}

export default contact