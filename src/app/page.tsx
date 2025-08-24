'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrefectureCheckbox from '@/components/prefecture/PrefectureCheckbox';
import PopulationChart from '@/components/population/PopulationChart';
import { useState } from 'react';
const queryClient = new QueryClient();

export default function Home() {
    const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

    return (
        <main style={{ maxWidth: '1000px', margin: 'auto' }}>
            <QueryClientProvider client={queryClient}>
                <PrefectureCheckbox onChange={setSelectedPrefCodes} />
                <PopulationChart prefCode={selectedPrefCodes} />
            </QueryClientProvider>
        </main>
    );
}
