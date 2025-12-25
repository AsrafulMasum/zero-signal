import { useEffect, useState } from 'react';
import NoteTab from '../../../components/shared/NoteTab';
import toast from 'react-hot-toast';
import { useGetRulesQuery, useUpdateRulesMutation } from '../../../redux/apiSlices/rulesSlice';

export default function AboutUs() {
    const [content, setContent] = useState('');

    const { data, refetch } = useGetRulesQuery({ type: 'about' });

    // Mutation hook for updating data
    const [updateRules] = useUpdateRulesMutation();

    // Set content when data is fetched
    useEffect(() => {
        if (data?.data?.content) {
            setContent(data.data.content);
        }
    }, [data]);

    // Handle form submit
    const handleSubmit = async () => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        const plainText = tempElement.innerText.trim();

        if (!plainText) {
            toast.error('Content cannot be empty');
            return;
        }

        try {
            await updateRules({
                type: 'about',
                content,
            }).unwrap();
            toast.success('Updated successfully!');
            refetch();
        } catch (err) {
            console.error('Update failed', err);
            toast.error('Failed to update');
        }
    };

    return (
        <div className="px-3">
            <h4 className="text-2xl font-semibold py-3">About Us</h4>
            <NoteTab content={content} handleContentChange={setContent} />
            <button
                onClick={handleSubmit}
                className="bg-primary h-12 w-full rounded-md text-white text-lg font-semibold"
            >
                Save
            </button>
        </div>
    );
}
