'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrefectureCheckbox from '@/components/prefecture/PrefectureCheckbox';
const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>hello</div>
            <PrefectureCheckbox />
        </QueryClientProvider>
    );
}
