import { Modal } from 'antd';
import { imageUrl } from '../../redux/api/baseApi';

const OrderDetailsModal = ({
    showOrderDetails,
    setShowOrderDetails,
}: {
    showOrderDetails: any;
    setShowOrderDetails: any;
}) => {
    return (
        <Modal width={500} centered open={!!showOrderDetails} onCancel={() => setShowOrderDetails(null)} footer={false}>
            <div>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    {showOrderDetails?.images?.map((img: string) => (
                        <img
                            key={img}
                            src={img && img?.startsWith('http') ? img : `${imageUrl}${img}`}
                            className="w-28 h-28 object-cover rounded-lg"
                            alt="img"
                        />
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{showOrderDetails?.title}</h3>
                    <p className="mb-2">{showOrderDetails?.description}</p>
                    <p>{showOrderDetails?.address}</p>
                    <p className="font-medium mt-2">{showOrderDetails?.type}</p>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;
