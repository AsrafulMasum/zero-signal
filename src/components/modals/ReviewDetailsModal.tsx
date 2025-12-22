import React from 'react';
import { Modal, Rate } from 'antd';
import { CiUser } from 'react-icons/ci';

export interface ReviewDetails {
    customerName: string;
    chefName: string;
    dishName: string;
    rating: number;
    createdAt: string;
    reviewText: string;
    status: string;
    customerImage?: string;
}

interface ReviewDetailsModalProps {
    open: boolean;
    onClose: () => void;
    review: ReviewDetails | null;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({ open, onClose, review }) => {
    if (!review) return null;

    return (
        <Modal open={open} onCancel={onClose} footer={null} centered width={420} className="review-details-modal">
            <div className="space-y-4">
                {/* Header */}
                <h3 className="text-primary font-semibold text-lg">Review Details</h3>

                {/* Profile Info */}
                <div className="flex items-center gap-3">
                    {review?.customerImage ? (
                        <img
                            src={review.customerImage || 'https://via.placeholder.com/50'}
                            alt="user"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <CiUser size={24} />
                    )}
                    <div>
                        <p className="font-semibold text-gray-800">{review.customerName}</p>
                        <p className="text-gray-400 text-xs">2 days ago</p>
                    </div>
                </div>

                {/* Review Info */}
                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="font-medium text-gray-600">Chef name : </span>{' '}
                        <span className="text-gray-800">{review.chefName}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Dish Name : </span>{' '}
                        <span className="text-gray-800">{review.dishName}</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <span className="font-medium text-gray-600">Rating : </span>{' '}
                        <Rate disabled allowHalf defaultValue={review.rating} style={{ color: '#FADB14' }} />
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Date : </span>{' '}
                        <span className="text-gray-800">{review.createdAt}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Review Text : </span>{' '}
                        <span className="text-gray-700 leading-relaxed">{review.reviewText}</span>
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-center gap-3 pt-3">
                    <button className="h-10 px-4 rounded-md text-black text-sm border border-primary">Reject</button>
                    <button className="bg-primary h-10 px-4 rounded-md text-white text-sm">Published</button>
                </div>
            </div>
        </Modal>
    );
};

export default ReviewDetailsModal;
