import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Service {
    name: string;
    desc: string;
    price: number;
    time: string;
    category: string;
}

interface ServiceCategoryProps {
    title: string;
    services: Service[];
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ title, services }) => {
    if (!services || services.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0f392b] mb-6 border-b pb-2">{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="glass-card p-6 hover:shadow-lg transition-all">
                        <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            [Image: {service.name}]
                        </div>
                        <h3 className="text-xl font-bold text-[#0f392b] mb-2">{service.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{service.desc}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-[#d4af37]">₹{service.price}</span>
                            <span className="text-xs text-gray-500">{service.time}</span>
                        </div>
                        <Link to="/book" className="btn btn-primary w-full mt-4">Book Now</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services", err));
    }, []);

    const womenServices = services.filter(s => s.category === 'Women');
    const menServices = services.filter(s => s.category === 'Men');
    const kidsServices = services.filter(s => s.category === 'Kids');
    const alterations = services.filter(s => s.category === 'Alterations');

    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-[#0f392b] mb-8 text-center">Our Services</h1>
            <ServiceCategory title="Women's Stitching" services={womenServices} />
            <ServiceCategory title="Men's Stitching" services={menServices} />
            <ServiceCategory title="Kids' Stitching" services={kidsServices} />
            <ServiceCategory title="Alterations" services={alterations} />
        </div>
    );
};

export default Services;
