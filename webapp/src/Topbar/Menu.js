import React, { useState } from 'react';
import LeftMenu from '../LeftMenu/LeftMenu';

function Menu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Toggle button */}
            <button
                className="p-3 text-2xl text-gray-900 dark:text-gray-100"
                onClick={() => setOpen(true)}
            >
                <i className="bi bi-list"></i>
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar panel */}
            <div className={`
                fixed top-0 left-0 h-full w-72 z-50
                bg-white dark:!bg-gray-950
                transform transition-transform duration-300 ease-in-out
                ${open ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white dark:!bg-gray-950 dark:!text-gray-100">
                    <h5 className="text-lg font-semibold">Menu</h5>
                    <button
                        className="text-xl text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto h-[calc(100%-64px)] dark:!bg-gray-950">
                    <LeftMenu />
                </div>
            </div>
        </>
    );
}

export default Menu;
