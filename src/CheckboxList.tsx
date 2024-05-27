import React, { useState } from 'react';
import { ReactComponent as CheckedIcon } from './checked.svg';
import { ReactComponent as UncheckedIcon } from './unchecked.svg';

type CheckedItems = {
    [key: string]: boolean;
};

const CheckboxList: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: !prevCheckedItems[name],
        }));
    };

    const handleSelectAll = () => {
        const allChecked = Object.values(checkedItems).every(Boolean);
        const updatedItems = Object.keys(checkedItems).reduce((items, key) => {
            items[key] = !allChecked;
            return items;
        }, {} as CheckedItems);
        setCheckedItems(updatedItems);
    };

    const allChecked = Object.values(checkedItems).every(Boolean);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = Object.keys(checkedItems).length;

    return (
        <div>
            <div
                className="checkbox-container"
                onClick={handleSelectAll}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
                {allChecked ? <CheckedIcon /> : <UncheckedIcon />}
                <span style={{ marginLeft: 8 }}>Select All</span>
            </div>
            <div>
                {Object.keys(checkedItems).map((item) => (
                    <div
                        key={item}
                        className="checkbox-container"
                        onClick={() =>
                            handleChange({ target: { name: item } } as React.ChangeEvent<HTMLInputElement>)
                        }
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        {checkedItems[item] ? <CheckedIcon /> : <UncheckedIcon />}
                        <span style={{ marginLeft: 8 }}>{item}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 16 }}>
                Checked: {checkedCount} / Total: {totalCount}
            </div>
        </div>
    );
};

export default CheckboxList;
