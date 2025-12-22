import { Modal } from 'antd';

export default function BlockModal({
    isBlockModalVisible,
    handleBlockCancel,
}: {
    isBlockModalVisible: boolean;
    handleBlockCancel: () => void;
    handleBlockConfirm: () => void;
    isUserBlocked: boolean;
}) {
    const handleDelete = () => {};
    return (
        <Modal
            open={isBlockModalVisible}
            onCancel={handleBlockCancel}
            footer={null}
            closeIcon={<span className="text-gray-400 hover:text-gray-600 text-xl">×</span>}
            width={400}
            centered
        >
            <div className="p-4 text-center">
                <p className="text-[#272728] text-xl">Are you sure?</p>
                <p className="pt-4 pb-10 text-[#898888]">
                    Do you really want to delete these records? This process cannot be undone.
                </p>
                <div className="flex items-center justify-between">
                    <button onClick={handleDelete} className="text-[#272728] bg-white px-6 py-2 rounded-md border">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="bg-[#EA545526] text-[#EA5455] px-6 py-2 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
