import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Failed to fetch reviews", err));
    }, []);

    return (
        <div className="pt-24 pb-12 container mx-auto px-4">
            <h1 className="text-4xl font-bold text-[#0f392b] mb-8 text-center">Customer Reviews</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <div key={index} className="glass-card p-6">
                        <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <p className="text-gray-600 mb-6">"{review.comment}"</p>
                        <div className="flex justify-between items-center border-t pt-4">
                            <span className="font-bold text-[#0f392b]">{review.name}</span>
                            <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
