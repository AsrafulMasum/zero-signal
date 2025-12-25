import { useEffect, useState } from 'react';
import NoteTab from '../../../components/shared/NoteTab';
import { useGetRulesQuery, useUpdateRulesMutation } from '../../../redux/apiSlices/rulesSlice';
import toast from 'react-hot-toast';

export default function TermsAndCondition() {
    const [content, setContent] = useState('');

    const { data, refetch } = useGetRulesQuery({ type: 'terms' });

    const [updateRules] = useUpdateRulesMutation();

    useEffect(() => {
        if (data?.data?.content) {
            setContent(data.data.content);
        }
    }, [data]);

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
                type: 'terms',
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
        <div>
            <h4 className="text-2xl font-semibold py-3">Terms & Conditions</h4>
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
