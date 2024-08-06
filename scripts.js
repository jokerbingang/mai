document.addEventListener('DOMContentLoaded', function () {
    // 获取导航栏的切换按钮和导航菜单
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');

    // 为导航栏切换按钮添加点击事件监听器
    navToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
    });

    // 获取所有导航链接
    const links = document.querySelectorAll('nav ul li a');

    // 为每个导航链接添加点击事件监听器
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止默认点击行为
            const targetId = link.getAttribute('href').substring(1); // 获取目标部分的ID
            const targetSection = document.getElementById(targetId); // 获取目标部分的元素
            window.scrollTo({
                top: targetSection.offsetTop - 80, // 调整偏移量以确保导航栏不会遮挡内容
                behavior: 'smooth' // 平滑滚动
            });

            // 移除所有导航链接的活跃状态
            links.forEach(l => l.classList.remove('active'));
            // 为当前点击的导航链接添加活跃状态
            link.classList.add('active');

            // 在移动设备上点击导航链接后隐藏导航菜单
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });

    // 窗口滚动事件监听器，更新导航链接的活跃状态
    window.addEventListener('scroll', function () {
        let current = '';

        // 确定当前滚动位置对应的部分
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 81; // 调整偏移量以确保导航栏不会遮挡内容
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // 更新导航链接的活跃状态
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});