import React from 'react';
import LeftMenu from './LeftMenu/LeftMenu';
import Menubutton from './LeftMenu/Menubutton';

function Menu({buttons}) {
    return (
        <>
            <button className="btn justify-content-start" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <i className="bi bi-list"></i>
            </button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <LeftMenu buttons={buttons} />
                </div>
            </div>
        </>
    );
}

export default Menu;
