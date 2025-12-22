import { Modal } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';

const OrderDetailsModal = ({
    showOrderDetails,
    setShowOrderDetails,
}: {
    showOrderDetails: any;
    setShowOrderDetails: any;
}) => {
    console.log(showOrderDetails);
    return (
        <Modal width={800} centered open={!!showOrderDetails} onCancel={() => setShowOrderDetails(null)} footer={false}>
            <div className="p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4">
                            <p className="text-xl font-semibold text-sub_title">
                                Order ID : {showOrderDetails?.orderNumber}
                            </p>
                            {/* Status badge with dynamic background color */}
                            {(() => {
                                const statusColorMap = {
                                    pending: { color: '#D48806', bg: '#F7F1CC' },
                                    processing: { color: '#1890FF', bg: '#D9EEFF' },
                                    shipped: { color: '#13C2C2', bg: '#CCFAF9' },
                                    cancelled: { color: '#FF4D4F', bg: '#FFD8D7' },
                                    completed: { color: '#52C41A', bg: '#D9F2CD' },
                                    returned: { color: '#FF0000', bg: '#FFCCCC' },
                                } as const;
                                type StatusKey = keyof typeof statusColorMap;
                                const status = showOrderDetails?.deliveryStatus as StatusKey | undefined;
                                const { color, bg } =
                                    status && status in statusColorMap
                                        ? statusColorMap[status]
                                        : {
                                              color: '#333',
                                              bg: '#f0f0f0',
                                          };
                                return (
                                    <p
                                        className="py-1 px-5 rounded text-lg capitalize"
                                        style={{ background: bg, color, fontWeight: 500 }}
                                    >
                                        {showOrderDetails?.deliveryStatus}
                                    </p>
                                );
                            })()}
                        </div>
                        <p className="text-lg"> Chef Name : {showOrderDetails?.chefName}</p>
                        <div className="flex items-center gap-4 mt-1 text-[#5C5C5C]">
                            <IoCalendarOutline className="text-2xl" />
                            <p className="text-lg"> {showOrderDetails?.orderData}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-2 bg-gray-100 rounded h-16">
                            <CiUser className="text-5xl" />
                        </div>
                        <div>
                            <h4 className="text-[#60A548] text-xl font-semibold">Customer</h4>
                            <p className="text-[#5C5C5C] font-semibold">
                                Full Name : {showOrderDetails?.customerName || 'Not Added Yet'}
                            </p>
                            <p className="text-[#5C5C5C] font-semibold">Email : {showOrderDetails?.email}</p>
                            <p className="text-[#5C5C5C] font-semibold">
                                Phone : {showOrderDetails?.user?.contact || 'Not Added'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="my-10">
                    <h4 className="text-[#60A548] text-xl font-semibold">Payment Info</h4>
                    <div className="flex items-center gap-2 mt-4">
                        <img className="py-1 px-1.5 border rounded" src="/card.svg" alt="" />
                        <p className="text-[#5C5C5C] text-lg font-semibold">
                            Master Card -- {showOrderDetails?.cardNumber || '**** **** **** 4242'}
                        </p>
                    </div>
                </div>

                <hr />

                <div className="mt-8 flex items-center justify-between">
                    <h4 className="text-primary text-2xl font-bold">Total</h4>
                    <p className="text-xl text-primary font-semibold">$ {showOrderDetails?.price || '106'}</p>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;
