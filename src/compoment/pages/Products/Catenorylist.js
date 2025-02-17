import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Catenorylist = () => {
    const menuRef = useRef(null);
    const [menuState, setMenuState] = useState(() => {
        // Lấy trạng thái menu từ localStorage hoặc sử dụng trạng thái mặc định nếu chưa lưu
        const savedMenuState = localStorage.getItem('menuState');
        return savedMenuState ? JSON.parse(savedMenuState) : {
            dashboard: false,
            layouts: false,
            frontPages: false,
            ecommerce: false,
            settings: false,
            order: false
        };
    });
    const [categories, setCategories] = useState([]);

    // Gọi API để lấy dữ liệu danh mục
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Category');
            // Lưu dữ liệu `response.data` vào state `categories`
            setCategories(response.data);
            console.log('API response:', response.data);

            // Kiểm tra phản hồi
            if (response.status === 200) {
                console.log('Categories fetched successfully:', response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error.response?.data || error.message);
        }
    };

    // Chỉ gọi `fetchCategories` một lần khi component được mount
    useEffect(() => {
        fetchCategories();
    }, []);


    // Hàm xử lý toggle cho từng menu
    const handleMenuToggle = (menuName) => {
        setMenuState((prevState) => {
            const newState = {
                ...prevState,
                [menuName]: !prevState[menuName], // Đảo ngược trạng thái của menu được click
            };
            // Lưu trạng thái menu mới vào localStorage
            localStorage.setItem('menuState', JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        const menuInner = menuRef.current;

        // Kiểm tra nếu nội dung vượt quá chiều cao của container
        if (menuInner.scrollHeight > menuInner.clientHeight) {
            menuInner.style.overflowY = 'auto';
        } else {
            menuInner.style.overflowY = 'hidden';
        }

        // Lấy vị trí cuộn từ localStorage và đặt lại
        const savedScrollPosition = localStorage.getItem('menuScrollPosition');
        if (savedScrollPosition) {
            menuInner.scrollTop = parseInt(savedScrollPosition, 10);
        }

        // Lưu vị trí cuộn trước khi trang được tải lại
        const handleBeforeUnload = () => {
            localStorage.setItem('menuScrollPosition', menuInner.scrollTop);
        };

        const handleResize = () => {
            if (menuInner.scrollHeight > menuInner.clientHeight) {
                menuInner.style.overflowY = 'auto';
            } else {
                menuInner.style.overflowY = 'hidden';
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup event listener
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" data-bg-class="bg-menu-theme">
                    <div className="app-brand demo">
                        <a href="index.html" className="app-brand-link">
                            <span className="app-brand-logo demo">
                                <svg
                                    width={25}
                                    viewBox="0 0 25 42"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <defs>
                                        <path
                                            d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                                            id="path-1"
                                        />
                                        <path
                                            d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                                            id="path-3"
                                        />
                                        <path
                                            d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                                            id="path-4"
                                        />
                                        <path
                                            d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                                            id="path-5"
                                        />
                                    </defs>
                                    <g
                                        id="g-app-brand"
                                        stroke="none"
                                        strokeWidth={1}
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                                            <g id="Icon" transform="translate(27.000000, 15.000000)">
                                                <g id="Mask" transform="translate(0.000000, 8.000000)">
                                                    <mask id="mask-2" fill="white">
                                                        <use xlinkHref="#path-1" />
                                                    </mask>
                                                    <use fill="#696cff" xlinkHref="#path-1" />
                                                    <g id="Path-3" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-3" />
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3" />
                                                    </g>
                                                    <g id="Path-4" mask="url(#mask-2)">
                                                        <use fill="#696cff" xlinkHref="#path-4" />
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4" />
                                                    </g>
                                                </g>
                                                <g
                                                    id="Triangle"
                                                    transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                                                >
                                                    <use fill="#696cff" xlinkHref="#path-5" />
                                                    <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                            <span className="app-brand-text demo menu-text fw-bold ms-2">sneat</span>
                        </a>

                        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                            <i className="bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center"></i>
                        </a>
                    </div>

                    <div className="menu-inner-shadow" style={{ display: "none" }}></div>

                    {/* Menu Inner */}
                    <ul className="menu-inner py-1" ref={menuRef} style={{ maxHeight: "700px" }}>
                        <li className={`menu-item ${menuState.ecommerce ? 'open' : ''}`}>
                            <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('ecommerce'); }}>
                                <i className="menu-icon tf-icons bx bx-cart-alt" />
                                <div className="text-truncate" data-i18n="eCommerce">
                                    eCommerce
                                </div>
                            </a>
                            <ul className="menu-sub">
                                <li className="menu-item">
                                    <a href="/Commerce" className="menu-link">
                                        <div className="text-truncate" data-i18n="Dashboard">
                                            Dashboard
                                        </div>
                                    </a>
                                </li>
                                <li className={`menu-item ${menuState.frontPages ? 'open' : ''}`}>
                                    <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('frontPages'); }}>
                                        <div className="text-truncate" data-i18n="Products">
                                            Products
                                        </div>
                                    </a>
                                    <ul className="menu-sub">
                                        <li className="menu-item">
                                            <a href="/Product" className="menu-link">
                                                <div className="text-truncate" data-i18n="Product List">
                                                    Product List
                                                </div>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/Addproduct" className="menu-link">
                                                <div className="text-truncate" data-i18n="Add Product">
                                                    Add Product
                                                </div>
                                            </a>
                                        </li>
                                        <li className="menu-item active">
                                            <a href="/Catenorylist" className="menu-link">
                                                <div className="text-truncate" data-i18n="Category List">
                                                    Category List
                                                </div>
                                            </a>
                                        </li>
                                        <li className="menu-item ">
                                            <a href="/Brandlist" className="menu-link">
                                                <div className="text-truncate" data-i18n="Category List">
                                                    Brand List
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`menu-item ${menuState.order ? 'open' : ''}`}>
                                    <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('order'); }}>
                                        <div className="text-truncate" data-i18n="Order">
                                            Order
                                        </div>
                                    </a>
                                    <ul className="menu-sub">
                                        <li className="menu-item">
                                            <a href="/Oderlist" className="menu-link">
                                                <div className="text-truncate" data-i18n="Order List">
                                                    Order List
                                                </div>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/Oderdetails" className="menu-link">
                                                <div className="text-truncate" data-i18n="Order Details">
                                                    Order Details
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                               
                            </ul>
                        </li>


                        <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                            <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
                        </div>
                        <div className="ps__rail-y" style={{ top: 0, height: 254, right: 4 }}>
                            <div
                                className="ps__thumb-y"
                                tabIndex={0}
                                style={{ top: 0, height: 44 }}
                            />
                        </div>
                    </ul>
                </aside>
                <div className="layout-page">
                    {/* Navbar */}
                    <nav
                        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                        id="layout-navbar"
                    >
                        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0   d-xl-none ">
                            <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                                <i className="bx bx-menu bx-md" />
                            </a>
                        </div>
                        
                        {/* Search Small Screens */}
                        <div className="navbar-search-wrapper search-input-wrapper d-none">
                            <span
                                className="twitter-typeahead"
                                style={{ position: "relative", display: "inline-block" }}
                            >
                                <input
                                    type="text"
                                    className="form-control search-input container-xxl border-0 tt-input"
                                    placeholder="Search..."
                                    aria-label="Search..."
                                    autoComplete="off"
                                    spellCheck="false"
                                    dir="auto"
                                    style={{ position: "relative", verticalAlign: "top" }}
                                />
                                <pre
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        visibility: "hidden",
                                        whiteSpace: "pre",
                                        fontFamily:
                                            '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                                        fontSize: 15,
                                        fontStyle: "normal",
                                        fontVariant: "normal",
                                        fontWeight: 400,
                                        wordSpacing: 0,
                                        letterSpacing: 0,
                                        textIndent: 0,
                                        textRendering: "auto",
                                        textTransform: "none"
                                    }}
                                />
                                <div
                                    className="tt-menu navbar-search-suggestion ps"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        zIndex: 100,
                                        display: "none"
                                    }}
                                >
                                    <div className="tt-dataset tt-dataset-pages" />
                                    <div className="tt-dataset tt-dataset-files" />
                                    <div className="tt-dataset tt-dataset-members" />
                                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                        <div
                                            className="ps__thumb-x"
                                            tabIndex={0}
                                            style={{ left: 0, width: 0 }}
                                        />
                                    </div>
                                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                                        <div
                                            className="ps__thumb-y"
                                            tabIndex={0}
                                            style={{ top: 0, height: 0 }}
                                        />
                                    </div>
                                </div>
                            </span>
                            <i className="bx bx-x bx-md search-toggler cursor-pointer" />
                        </div>
                    </nav>
                    {/* / Navbar */}
                    {/* Content wrapper */}
                    <div className="content-wrapper">
                        {/* Content */}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="app-ecommerce-category">
                                {/* Category List Table */}
                                <div className="card">
                                    <div className="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="card-header d-flex flex-wrap py-0 flex-column flex-sm-row">
                                                <div>
                                                    <div id="DataTables_Table_0_filter" className="dataTables_filter me-3 mb-sm-6 mb-0 ps-0">
                                                        <label>
                                                            <input type="search" className="form-control ms-0" placeholder="Search Category" aria-controls="DataTables_Table_0" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center justify-content-md-end align-items-baseline">
                                                    <div className="dt-action-buttons d-flex justify-content-center flex-md-row align-items-baseline pt-0">
                                                        <div className="dataTables_length" id="DataTables_Table_0_length">
                                                            <label>
                                                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select ms-0">
                                                                    <option value="7">7</option>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="50">50</option>
                                                                    <option value="70">70</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </label>
                                                        </div>
                                                        <div className="dt-buttons btn-group flex-wrap">
                                                            <button className="btn btn-secondary add-new btn-primary ms-2" tabIndex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEcommerceCategoryList">
                                                                <span>
                                                                    <i className="bx bx-plus bx-sm me-0 me-sm-2"></i>
                                                                    <span className="d-none d-sm-inline-block">Add Category</span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table className="datatables-category-list table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style={{ width: '1163px' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="control sorting_disabled dtr-hidden" rowSpan="1" colSpan="1" aria-label="" style={{ width: '0px', display: 'none' }}></th>
                                                        <th className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowSpan="1" colSpan="1" data-col="1" aria-label="" style={{ width: '18px' }}>
                                                            <input type="checkbox" className="form-check-input" />
                                                        </th>
                                                        <th className="sorting sorting_desc" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Categories: activate to sort column ascending" aria-sort="descending" style={{ width: '557px' }}>
                                                            Categories
                                                        </th>
                                                        <th className="text-nowrap text-sm-end sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Total Products : activate to sort column ascending" style={{ width: '151px' }}>
                                                            Slug&nbsp;
                                                        </th>
                                                        <th className="text-nowrap text-sm-end sorting_disabled" rowSpan="1" colSpan="1" aria-label="Total Earning" style={{ width: '130px' }}>
                                                        Description
                                                        </th>
                                                        <th className="text-lg-center sorting_disabled" rowspan="1" colspan="1" style={{ width: '127px' }} aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories.map((category, index) => (
                                                        <tr key={category.categoryId} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="control" tabIndex="0" style={{ display: 'none' }}></td>
                                                            <td className="dt-checkboxes-cell">
                                                                <input type="checkbox" className="dt-checkboxes form-check-input" />
                                                            </td>
                                                            <td className="sorting_1">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                                                        <div className="avatar">
                                                                            {/* Nếu bạn có hình ảnh cho category thì thay đổi src bên dưới */}
                                                                            <img
                                                                                src={category.image}
                                                                                alt=""
                                                                                className="rounded-circle"
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-column justify-content-center">
                                                                        <span className="text-heading text-wrap fw-medium">{category.name}</span>
                                                                        <span className="text-truncate mb-0 d-none d-sm-block">
                                                                            <small>{category.description}</small>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-sm-end">{category.slug}</div>
                                                            </td>
                                                            <td>
                                                                <div className="mb-0 text-sm-end">{category.description}</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-sm-center justify-content-sm-center">
                                                                    <button className="btn btn-icon">
                                                                        <i className="bx bx-edit bx-md"></i>
                                                                    </button>
                                                                    <button className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded bx-md"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-end m-0">
                                                                    <Link to={{ pathname: "/Addvariant" }} className="dropdown-item">View</Link>
                                                                        <a href="javascript:0;" className="dropdown-item">Suspend</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>


                                            </table>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                        Showing 1 to 7 of 14 entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination">
                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex="-1" className="page-link">
                                                                    <i className="bx bx-chevron-left bx-18px"></i>
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabIndex="0" className="page-link">1</a>
                                                            </li>
                                                            <li className="paginate_button page-item">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabIndex="0" className="page-link">2</a>
                                                            </li>
                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabIndex="0" className="page-link">
                                                                    <i className="bx bx-chevron-right bx-18px"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: '1%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Offcanvas to add new customer */}
                                <div
                                    className="offcanvas offcanvas-end"
                                    tabIndex={-1}
                                    id="offcanvasEcommerceCategoryList"
                                    aria-labelledby="offcanvasEcommerceCategoryListLabel"
                                >
                                    {/* Offcanvas Header */}
                                    <div className="offcanvas-header py-6">
                                        <h5
                                            id="offcanvasEcommerceCategoryListLabel"
                                            className="offcanvas-title"
                                        >
                                            Add Category
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close text-reset"
                                            data-bs-dismiss="offcanvas"
                                            aria-label="Close"
                                        />
                                    </div>
                                    {/* Offcanvas Body */}
                                    <div className="offcanvas-body border-top">
                                        <form
                                            className="pt-0 fv-plugins-bootstrap5 fv-plugins-framework"
                                            id="eCommerceCategoryListForm"
                                            onsubmit="return true"
                                            noValidate="novalidate"
                                        >
                                            {/* Title */}
                                            <div className="mb-6 fv-plugins-icon-container">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-title"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ecommerce-category-title"
                                                    placeholder="Enter category title"
                                                    name="categoryTitle"
                                                    aria-label="category title"
                                                />
                                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                            </div>
                                            {/* Slug */}
                                            <div className="mb-6 fv-plugins-icon-container">
                                                <label className="form-label" htmlFor="ecommerce-category-slug">
                                                    Slug
                                                </label>
                                                <input
                                                    type="text"
                                                    id="ecommerce-category-slug"
                                                    className="form-control"
                                                    placeholder="Enter slug"
                                                    aria-label="slug"
                                                    name="slug"
                                                />
                                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                            </div>
                                            {/* Image */}
                                            <div className="mb-6">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-image"
                                                >
                                                    Attachment
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="ecommerce-category-image"
                                                />
                                            </div>
                                            {/* Parent category */}
                                            <div className="mb-6 ecommerce-select2-dropdown">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-parent-category"
                                                >
                                                    Parent category
                                                </label>
                                                <div className="position-relative">
                                                    <select
                                                        id="ecommerce-category-parent-category"
                                                        className="select2 form-select select2-hidden-accessible"
                                                        data-placeholder="Select parent category"
                                                        data-select2-id="ecommerce-category-parent-category"
                                                        tabIndex={-1}
                                                        aria-hidden="true"
                                                    >
                                                        <option value="" data-select2-id={2}>
                                                            Select parent Category
                                                        </option>
                                                        <option value="Household">Household</option>
                                                        <option value="Management">Management</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Automotive">Automotive</option>
                                                    </select>
                                                    <span
                                                        className="select2 select2-container select2-container--default"
                                                        dir="ltr"
                                                        data-select2-id={1}
                                                        style={{ width: "336.8px" }}
                                                    >
                                                        <span className="selection">
                                                            <span
                                                                className="select2-selection select2-selection--single"
                                                                role="combobox"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                                tabIndex={0}
                                                                aria-disabled="false"
                                                                aria-labelledby="select2-ecommerce-category-parent-category-container"
                                                            >
                                                                <span
                                                                    className="select2-selection__rendered"
                                                                    id="select2-ecommerce-category-parent-category-container"
                                                                    role="textbox"
                                                                    aria-readonly="true"
                                                                >
                                                                    <span className="select2-selection__placeholder">
                                                                        Select parent category
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="select2-selection__arrow"
                                                                    role="presentation"
                                                                >
                                                                    <b role="presentation" />
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div className="mb-6">
                                                <label className="form-label">Description</label>
                                                <div className="form-control p-0 py-1">
                                                    <div
                                                        className="comment-editor border-0 ql-container ql-snow"
                                                        id="ecommerce-category-description"
                                                    >
                                                        <div
                                                            className="ql-editor ql-blank"
                                                            data-gramm="false"
                                                            contentEditable="true"
                                                            data-placeholder="Write a Comment..."
                                                        >
                                                            <p>
                                                                <br />
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="ql-clipboard"
                                                            contentEditable="true"
                                                            tabIndex={-1}
                                                        />
                                                        <div className="ql-tooltip ql-hidden">
                                                            <a
                                                                className="ql-preview"
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                href="about:blank"
                                                            />
                                                            <input
                                                                type="text"
                                                                data-formula="e=mc^2"
                                                                data-link="https://quilljs.com"
                                                                data-video="Embed URL"
                                                            />
                                                            <a className="ql-action" />
                                                            <a className="ql-remove" />
                                                        </div>
                                                    </div>
                                                    <div className="comment-toolbar border-0 rounded ql-toolbar ql-snow">
                                                        <div className="d-flex justify-content-end">
                                                            <span className="ql-formats me-0">
                                                                <button className="ql-bold" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-italic" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={13}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={5}
                                                                            x2={11}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={8}
                                                                            x2={10}
                                                                            y1={14}
                                                                            y2={4}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-underline" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
                                                                        />{" "}
                                                                        <rect
                                                                            className="ql-fill"
                                                                            height={1}
                                                                            rx="0.5"
                                                                            ry="0.5"
                                                                            width={12}
                                                                            x={3}
                                                                            y={15}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="ql-list"
                                                                    value="ordered"
                                                                    type="button"
                                                                >
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke ql-thin"
                                                                            x1="2.5"
                                                                            x2="4.5"
                                                                            y1="5.5"
                                                                            y2="5.5"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-fill"
                                                                            d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke ql-thin"
                                                                            d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke ql-thin"
                                                                            d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="ql-list"
                                                                    value="bullet"
                                                                    type="button"
                                                                >
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-link" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={11}
                                                                            y1={7}
                                                                            y2={11}
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-even ql-stroke"
                                                                            d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-even ql-stroke"
                                                                            d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-image" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <rect
                                                                            className="ql-stroke"
                                                                            height={10}
                                                                            width={12}
                                                                            x={3}
                                                                            y={4}
                                                                        />{" "}
                                                                        <circle className="ql-fill" cx={6} cy={7} r={1} />{" "}
                                                                        <polyline
                                                                            className="ql-even ql-fill"
                                                                            points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Status */}
                                            <div className="mb-6 ecommerce-select2-dropdown">
                                                <label className="form-label">Select category status</label>
                                                <div className="position-relative">
                                                    <select
                                                        id="ecommerce-category-status"
                                                        className="select2 form-select select2-hidden-accessible"
                                                        data-placeholder="Select category status"
                                                        data-select2-id="ecommerce-category-status"
                                                        tabIndex={-1}
                                                        aria-hidden="true"
                                                    >
                                                        <option value="" data-select2-id={4}>
                                                            Select category status
                                                        </option>
                                                        <option value="Scheduled">Scheduled</option>
                                                        <option value="Publish">Publish</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <span
                                                        className="select2 select2-container select2-container--default"
                                                        dir="ltr"
                                                        data-select2-id={3}
                                                        style={{ width: "336.8px" }}
                                                    >
                                                        <span className="selection">
                                                            <span
                                                                className="select2-selection select2-selection--single"
                                                                role="combobox"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                                tabIndex={0}
                                                                aria-disabled="false"
                                                                aria-labelledby="select2-ecommerce-category-status-container"
                                                            >
                                                                <span
                                                                    className="select2-selection__rendered"
                                                                    id="select2-ecommerce-category-status-container"
                                                                    role="textbox"
                                                                    aria-readonly="true"
                                                                >
                                                                    <span className="select2-selection__placeholder">
                                                                        Select category status
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="select2-selection__arrow"
                                                                    role="presentation"
                                                                >
                                                                    <b role="presentation" />
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Submit and reset */}
                                            <div className="mb-6">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-sm-3 me-1 data-submit"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="btn btn-label-danger"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    Discard
                                                </button>
                                            </div>
                                            <input type="hidden" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* / Content */}
                        {/* Footer */}
                        <footer className="content-footer footer bg-footer-theme">
                            <div className="container-xxl">
                                <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                    <div className="text-body">
                                        © 2024, made with ❤️ by{" "}
                                        <a
                                            href="https://themeselection.com"
                                            target="_blank"
                                            className="footer-link"
                                        >
                                            ThemeSelection
                                        </a>
                                    </div>
                                    <div className="d-none d-lg-inline-block">
                                        <a
                                            href="https://themeselection.com/license/"
                                            className="footer-link me-4"
                                            target="_blank"
                                        >
                                            License
                                        </a>
                                        <a
                                            href="https://themeselection.com/"
                                            target="_blank"
                                            className="footer-link me-4"
                                        >
                                            More Themes
                                        </a>
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/"
                                            target="_blank"
                                            className="footer-link me-4"
                                        >
                                            Documentation
                                        </a>
                                        <a
                                            href="https://themeselection.com/support/"
                                            target="_blank"
                                            className="footer-link d-none d-sm-inline-block"
                                        >
                                            Support
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        {/* / Footer */}
                        <div className="content-backdrop fade" />
                    </div>
                    {/* Content wrapper */}
                </div>


            </div>
        </div>
    )
}

export default Catenorylist