import React from 'react';

const Gallery = () => {
    const categories = ["All", "Bridal", "Casual", "Men's Wear", "Kids"];

    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-[#0f392b] mb-8 text-center">Our Portfolio</h1>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {categories.map(cat => (
                    <button key={cat} className="px-6 py-2 rounded-full border border-[#0f392b] text-[#0f392b] hover:bg-[#0f392b] hover:text-white transition-colors">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(item => (
                    <div key={item} className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                            [Gallery Image {item}]
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-white text-center p-4">
                                <h3 className="font-bold text-xl">Design Name</h3>
                                <p>Category</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
