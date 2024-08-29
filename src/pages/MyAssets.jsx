import { AssetsTable } from '@/components/AssetsTable';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';

export default function MyAssets() {
    return (
        <div className="min-h-screen">
            <PageHeader>
                <PageHeaderHeading>My Assets</PageHeaderHeading>
            </PageHeader>
            <AssetsTable />
        </div>
    );
}
