let backetNavbar  = document.querySelector('.navbar_backet');
let backetHiden  = document.querySelector('.navbar_hiden');


backetNavbar.addEventListener('mouseover', function(){
    backetHiden.style.display = 'block';
    console.log('ura');
})
backetNavbar.addEventListener('mouseout', function(){
    backetHiden.style.display = 'none';
    console.log('bbbra');
})


// backetNavbar.onfocus = function() {
//     console.log('test');
// }