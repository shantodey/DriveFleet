'use client'
import { Label, ListBox, Select, SearchField } from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';

const SearchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateParams = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8 items-end">
            <SearchField
                name="search"
                onChange={(value) => updateParams('q', value)}
                defaultValue={searchParams.get('q') || ""}
                className="w-full"
            >
                <Label>Search</Label>
                <SearchField.Group className="w-full">
                    <SearchField.SearchIcon />
                    <SearchField.Input className="w-full" placeholder="Search..." />
                    <SearchField.ClearButton />
                </SearchField.Group>
            </SearchField>

            <Select
                name="carType"
                className="w-full"
                placeholder="Select car type"
                selectedKey={searchParams.get('t')}
                onSelectionChange={(key) => updateParams('t', key)}
            >
                <Label>Car Type</Label>
                <Select.Trigger className="rounded-2xl w-full">
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="w-full">
                    <ListBox>
                        <ListBox.Item id="SUV">SUV</ListBox.Item>
                        <ListBox.Item id="Sedan">Sedan</ListBox.Item>
                        <ListBox.Item id="Hatchback">Hatchback</ListBox.Item>
                        <ListBox.Item id="Luxury">Luxury</ListBox.Item>
                        <ListBox.Item id="Coupe">Coupe</ListBox.Item>
                        <ListBox.Item id="Pickup">Pickup</ListBox.Item>
                        <ListBox.Item id="Van">Van</ListBox.Item>
                        <ListBox.Item id="Electric">Electric</ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
};

export default SearchComponent;