let tds = document.querySelectorAll('td');//返回所有td标签的数组给tds
tds.forEach(item => {//数组遍历，对每个元素进行事件绑定，点击之后修改样式
    item.onclick = () => {
        item.style.backgroundColor = '#0f0'
        // item.style.cssText = 'background-Color:black;'
        // item.setAttribute('style', 'background-Color:black;')
    }
});