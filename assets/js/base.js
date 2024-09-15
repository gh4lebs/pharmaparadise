class Header extends HTMLElement {

    constructor() {
        super();
    }
    connectedCallBack() {
        this.innerHTML = `<aside class="app-sidebar" id="aside">
        <div class="app-sidebar__logo">
            <a class="header-brand" href="index.html">
                <img src="assets/images/brand/logo-white.png" class="header-brand-img dark-logo" alt="logo">
                <img src="assets/images/brand/favicon.png" class="header-brand-img mobile-logo" alt="logo">
            </a>
        </div>
        <div class="app-sidebar3">
            <div class="app-sidebar__user">
                <div class="dropdown user-pro-body text-center">
                    <div class="user-pic">
                        <img src="assets/images/users/16.jpg" alt="user-img"
                            class="avatar-xxl rounded-circle mb-1">
                    </div>
                    <div class="user-info">
                        <h5 class=" mb-2">Pharma Paradise</h5>
                        <span class="text-muted app-sidebar__user-name text-sm">Admin</span>
                    </div>
                </div>
            </div>
            <ul class="side-menu">
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="index7.html">
                        <i class="feather feather-home sidemenu_icon"></i>
                        <span class="side-menu__label">الصفحة الرئيسية</span><i
                            class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="slide" href="#">
                        <i class="feather  feather-users sidemenu_icon"></i>
                        <span class="side-menu__label">الصيادلة</span><i class="angle fa fa-angle-left"></i>
                    </a>
                    <ul class="slide-menu">
                        <li><a href="accounts-list.html" class="slide-item">تأكيد الحسابات</a></li>
                        <li><a href="pharmacists.html" class="slide-item">الصيادلة المقبولين</a></li>
                        <li><a href="pharmacists-rejected.html" class="slide-item">الصيادلة المرفوضين</a></li>
                    </ul>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="order-track.html">
                        <i class="feather feather-clipboard sidemenu_icon"></i>
                        <span class="side-menu__label">الطلبات</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="products-list.html">
                        <i class="fa fa-tags sidemenu_icon"></i>
                        <span class="side-menu__label">المنتجات</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="factories-list .html">
                        <i class="fa fa-industry sidemenu_icon"></i>
                        <span class="side-menu__label">المعامل</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="offer list.html">
                        <i class="fa fa-gift sidemenu_icon"></i>
                        <span class="side-menu__label">العروض</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="invoice-list.html">
                        <i class="fe fe-file-text sidemenu_icon"></i>
                        <span class="side-menu__label">الفواتير</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" data-toggle="" href="drivers.html">
                        <i class="fa fa-id-card-o  sidemenu_icon"></i>
                        <span class="side-menu__label">السائقين</span><i class="angle fa fa-angle-left"></i>
                    </a>
                </li>
                <li class="slide">
                    <a class="side-menu__item" href="">
                        <i class="fa fa-sign-out sidemenu_icon"></i>
                        <span class="side-menu__label">تسجيل الخروج</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>`;

    }
}

customElements.define('special-header', Header);

