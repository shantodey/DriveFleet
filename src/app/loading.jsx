import { Spinner } from '@heroui/react';


const loading = () => {
    return (
        <div className="flex min-h-screen w-full justify-center items-center gap-4">
            <Spinner />
        </div>
    );
};

export default loading;