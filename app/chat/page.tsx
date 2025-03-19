import Layout from '@/components/layout';
import Chat from '@/views/chat';

export default function Page() {
    return (
        <Layout>
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
                <Chat />
            </div>
        </Layout>
    );
}
