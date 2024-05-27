import React, { useState } from 'react';
import { ReactComponent as CheckedIcon } from './checked.svg';
import { ReactComponent as UncheckedIcon } from './unchecked.svg';
import './CheckboxList.css';

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

    const handleChange = (name: string) => {
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

    const handleConfirm = () => {
        alert('Confirmed: ' + JSON.stringify(checkedItems, null, 2));
    };

    const handleCancel = () => {
        const resetItems = Object.keys(checkedItems).reduce((items, key) => {
            items[key] = false;
            return items;
        }, {} as CheckedItems);
        setCheckedItems(resetItems);
    };

    const allChecked = Object.values(checkedItems).every(Boolean);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = Object.keys(checkedItems).length;
    const anyChecked = Object.values(checkedItems).some(Boolean);

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
                    <label
                        key={item}
                        className="checkbox-container"
                        onClick={() => handleChange(item)}
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        {checkedItems[item] ? <CheckedIcon /> : <UncheckedIcon />}
                        <span style={{ marginLeft: 8 }}>{item}</span>
                    </label>
                ))}
            </div>
            <div style={{ marginTop: 16 }}>
                Checked: {checkedCount} / Total: {totalCount}
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: '10px' }}>
                <button onClick={handleConfirm} disabled={!anyChecked}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CheckboxList;
