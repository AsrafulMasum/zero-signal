import React from 'react';
import { Modal } from 'antd';
import { RefundType } from '../../types/types';

export interface RefundDetails {
    customerName: string;
    chefName: string;
    refundType: string;
    amount: string;
    refundPercent: string;
    reason: string;
}

interface RefundDetailsModalProps {
    open: boolean;
    onClose: () => void;
    refund: RefundType | null;
}

const RefundDetailsModal: React.FC<RefundDetailsModalProps> = ({ open, onClose, refund }) => {
    if (!refund) return null;

    return (
        <Modal open={open} onCancel={onClose} footer={null} centered width={450} className="refund-details-modal">
            <div className="space-y-6">
                {/* Header */}
                <h3 className="text-green-700 font-semibold text-lg">Refund Request</h3>

                {/* Refund Info */}
                <div className="bg-gray-50 rounded-lg p-5 space-y-3 text-sm">
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Customer :</span>
                        <span className="text-gray-800">{refund.customerName}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Chef :</span>
                        <span className="text-gray-800">{refund.chefName}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Refund Type :</span>
                        <span className="text-gray-800">{refund.refundType}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Amount :</span>
                        <span className="text-gray-800">{refund.amount}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Refund% :</span>
                        <span className="text-gray-800">{refund.refundPercent}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600 w-28 inline-block">Reason :</span>
                        <span className="text-gray-800">{refund.reason}</span>
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 pt-2">
                    <button className="border border-red-500 text-red-500 px-6 py-2 rounded-md text-sm hover:bg-red-50 transition">
                        Reject
                    </button>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm hover:bg-green-700 transition">
                        Approve
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default RefundDetailsModal;
