// Icon List
const icons = {
    workflow: "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='cog' class='svg-inline' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path class='icon-white' d='M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z'></path></svg>",
    collection: "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='th-large' class='svg-inline' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path class='icon-white' d='M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z'></path></svg>",
    unit: "<svg aria-hidden='true' focusable='false' class='svg-inline' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33 33'><g id='Layer_2' class='icon-white'><circle class='icon-white' cx='25' cy='8' r='8'></circle><circle class='st0' cx='8' cy='8' r='8'></circle><circle class='icon-white' cx='8' cy='25' r='8'></circle><circle class='st0' cx='25' cy='25' r='8'></circle></g></svg>",
    dashboard:"<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='th-large' class='svg-inline' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path class='icon-white' d='M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z'></path></svg>",
    batchIngest: "<svg class='svg-inline' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path class='icon-white' d='M19.7 30.6c0 1 0.4 1.7 1 2.4 0.3 0.3 0.6 0.5 0.9 0.8 0.1 0.1 0.2 0.3 0.2 0.5 0 0.7 0 1.4 0 2.1 0 0.3 0 0.5-0.4 0.5 -1.4 0.1-2.7 0.3-4.1 0.3 -1.5 0-2.9-0.1-4.4-0.2 -2.1-0.2-4.2-0.6-6.2-1.3 -0.4-0.1-0.8-0.3-1.2-0.5 -0.3-0.1-0.4-0.1-0.6 0.1 -0.7 0.7-0.6 1.3 0.2 2 1.1 0.8 2.3 1.3 3.6 1.7 3.2 1 6.6 1.1 9.9 1 0.2 0 0.3-0.1 0.5-0.1 0.2 0 0.3 0 0.5 0 0 1.6 1.1 2.8 1.8 4.1 0.4 0.7 0.8 1.3 1.2 2 -2.4 0.5-4.9 0.6-7.5 0.5 -3.2-0.1-6.3-0.6-9.3-1.9 -1.3-0.5-2.5-1.2-3.4-2.1 -0.9-0.9-1.5-1.9-1.4-3.2 0-1 0-1.9 0-2.9 0-1.1 0.3-2.1 1.1-3 0.1-0.1 0.2-0.2 0.1-0.3 -0.4-0.7-0.7-1.4-1.1-2.2C1 30.8 1 30.7 1 30.5c0-1.2 0-2.4 0-3.6 0-1.1 0.4-2.1 1.1-2.9l0.1-0.2c-0.3-0.6-0.7-1.1-1-1.6C1.1 21.9 1 21.4 1 21c0-1 0-2 0-3 -0.1-1.4 0.3-2.6 1.2-3.5 -0.4-0.8-0.8-1.5-1.1-2.2C1 12.2 1 12 1 11.8c0-1.2 0-2.4 0-3.5 0-1.5 0.7-2.6 1.8-3.6 1.9-1.6 4.1-2.4 6.4-2.9 3-0.7 6.1-1 9.2-0.8 3 0.2 5.9 0.6 8.7 1.7 1.4 0.5 2.7 1.3 3.8 2.3 0.9 0.9 1.5 2 1.4 3.3 0 1 0 2 0 3 0.1 1.1-0.4 1.9-1 2.7 -0.1 0.1-0.2 0.2-0.3 0.4 0.2 0.2 0.3 0.4 0.5 0.7 0.9 1.2 0.8 2.6 0.8 3.9l-0.2 0.2c-1.5 0.5-2.1 1.7-2.3 3.1 -0.1 0.5-0.2 0.8-0.7 1 -0.5 0.2-1 0.6-1.5 0.9 -0.2 0.1-0.4 0.1-0.6 0.1 -0.6-0.1-1.1-0.4-1.7-0.4 -1.3-0.2-2.4 0.4-3.1 1.5 -0.4 0.6-0.8 1.3-1.1 1.9 -0.1 0.3-0.3 0.4-0.6 0.4 -1.7 0.1-3.3 0.2-5 0.2 -2.1 0-4.2-0.3-6.3-0.8 -1.2-0.3-2.4-0.7-3.5-1.2 -0.3-0.1-0.5-0.2-0.7 0.1 -0.3 0.3-0.6 0.6-0.4 1.1 0.3 0.6 0.8 1 1.3 1.3 1.3 0.8 2.7 1.2 4.1 1.6 2.6 0.6 5.2 0.8 7.8 0.7C18.4 30.7 19 30.7 19.7 30.6zM16.7 12.1c2.6 0 5.1-0.2 7.6-1 1.4-0.4 2.8-0.9 4-1.9 0.7-0.6 0.7-1.3 0.1-1.9 -0.3-0.3-0.6-0.5-1-0.7 -2.4-1.4-5-1.9-7.7-2.1 -1.9-0.2-3.8-0.2-5.7 0 -2 0.2-4 0.5-5.9 1.2 -1 0.4-2 0.9-2.9 1.5 -1.1 0.7-1 1.4 0 2.2 0.5 0.4 1.2 0.8 1.8 1.1C10.1 11.7 13.4 12.1 16.7 12.1zM16.7 21.5c0.7 0 1.4-0.1 2.2-0.1 2.2-0.1 4.4-0.5 6.5-1.2 1.1-0.4 2.2-0.8 3.1-1.7 0.6-0.6 0.6-1.1 0-1.8 -0.2-0.2-0.4-0.2-0.6-0.1 -0.8 0.3-1.7 0.6-2.5 0.9 -2.1 0.6-4.2 0.9-6.4 1.1 -2.8 0.2-5.5 0-8.3-0.4 -1.8-0.3-3.6-0.8-5.2-1.6l-0.3 0c-0.8 0.7-1 1.2-0.2 2 0.8 0.7 1.7 1.2 2.7 1.5C10.6 21.1 13.6 21.4 16.7 21.5z'></path><path class='icon-white' d='M25.5 26.1c0.7 0.2 1.3 0.4 1.9 0.6 0.7 0.3 1.2 0.2 1.8-0.3 0.8-0.6 1.9-1.1 2.8-1.5 0.3-0.1 0.4-0.3 0.4-0.5 0.1-0.7 0.2-1.3 0.4-2 0.1-0.7 0.4-0.9 1.1-0.9 1.3 0 2.5 0 3.8 0 0.6 0 0.9 0.3 1.1 0.9 0.2 0.7 0.3 1.4 0.5 2.1 0 0.1 0.2 0.3 0.3 0.4 1.2 0.5 2.4 1.1 3.4 2 0.2 0.2 0.4 0.2 0.7 0.1 0.6-0.2 1.3-0.4 1.9-0.7 0.7-0.2 1-0.1 1.4 0.5 0.6 1 1.2 2 1.8 3 0.4 0.8 0.4 1-0.2 1.6 -0.4 0.4-0.8 0.8-1.2 1.1 -0.5 0.3-0.5 0.7-0.5 1.3 0.1 1.2 0 2.3 0 3.5 0 0.3 0 0.4 0.2 0.6 0.5 0.4 0.9 0.8 1.4 1.2 0.7 0.6 0.8 1 0.3 1.7 -0.6 1-1.2 2-1.8 3 -0.3 0.6-0.7 0.7-1.3 0.5 -0.7-0.2-1.4-0.5-2-0.7 -0.2 0-0.4 0-0.6 0.1 -1 0.8-2.2 1.5-3.4 2 -0.1 0-0.3 0.2-0.3 0.4 -0.2 0.7-0.3 1.5-0.5 2.2 -0.1 0.6-0.4 0.9-1 0.9 -1.3 0-2.5 0-3.8 0 -0.7 0-0.9-0.2-1.1-0.9 -0.2-0.7-0.3-1.4-0.4-2.1 0-0.3-0.2-0.4-0.4-0.5 -1.3-0.4-2.4-1.1-3.4-2 -0.1-0.1-0.4-0.1-0.5-0.1 -0.7 0.2-1.3 0.4-2 0.7 -0.7 0.2-1 0.1-1.4-0.5 -0.6-1.1-1.2-2.1-1.8-3.2 -0.3-0.6-0.3-0.9 0.2-1.3 0.5-0.5 1.1-1 1.6-1.5 0.1-0.1 0.2-0.4 0.2-0.7 -0.2-1.2-0.2-2.5 0-3.7 0.1-0.3 0-0.5-0.3-0.7 -0.5-0.4-1-0.9-1.6-1.4 -0.4-0.4-0.5-0.8-0.3-1.3 0.6-1.1 1.3-2.3 1.9-3.4C24.9 26.5 25.3 26.3 25.5 26.1zM40.8 35.3c0.1-2.7-2.2-4.9-4.9-5 -2.7 0-5.1 2.3-5 5 0.1 2.8 2.3 4.9 4.9 4.9C38.5 40.3 40.8 38 40.8 35.3z'></path></svg>",
    deliverables: "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='clipboard-check' class='svg-inline' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path class='icon-white' d='M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z'></path></svg>",
    amp: '<svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1252 366">&gt;<rect class="logo-bg" width="1252" height="366"></rect><path class="logo-fg" d="M632.1 127.8c-2.3 5.4-4.3 10-6.2 14.7 -9.7 23.3-19.3 46.6-29 70 -1.1 2.7-2.2 5.3-3.4 7.9 -1.6 3.8-4.5 5.6-8.6 5.6 -9.9 0-19.8-0.2-29.8 0 -5.4 0.1-11-4.9-8.5-12.3 1.4-4.2 3.4-8.3 5.1-12.4 5.5-12.9 11-25.9 16.4-38.8 7.6-18.1 15.3-36.2 22.9-54.3 5.2-12.4 10.5-24.7 15.6-37.1 2-4.9 5.4-7.2 10.7-7.1 9.9 0.1 19.8 0.1 29.8 0 5.3-0.1 8.6 2.2 10.7 7.1 11.3 27.1 22.7 54.2 34.2 81.3 8.4 20 16.9 40 25.4 60 8 18.8 15.9 37.7 23.8 56.5 0.8 1.9 1.4 3.9 1 6.1 -0.7 3.8-3.8 6.9-7.8 7.5 -1.3 0.2-2.6 0.1-3.8 0.1 -65.4 0-130.8 0-196.3 0 -1.6 0-3.2 0-4.8-0.3 -5.2-1-8.1-5.5-7.1-10.7 0.3-1.4 0.8-2.7 1.4-4.1 3-7.1 6-14.1 9-21.2 1.7-4.1 4.6-6.4 9.2-6.3 1.1 0 2.2 0 3.4 0 42.4 0 84.8 0 127.2 0 1.4 0 2.9 0 4.3 0 1.3-0.1 1.7-0.7 1.3-1.9 -2.9-7.1-5.9-14.2-8.8-21.3 -5.5-13.3-11-26.6-16.5-39.8 -6.5-15.7-12.9-31.3-19.3-47C633.3 129.6 632.9 129.1 632.1 127.8z"></path><path class="logo-fg" d="M872.3 149.8c1.8-2.4 3.2-4.3 4.6-6.2 16.6-22.9 33.2-45.8 49.8-68.8 2.2-3 4.3-5.9 6.5-8.9 0.9-1.3 2-1.9 3.6-1.9 10.2 0 20.5 0.1 30.7 0 5.1 0 9.8 4.1 9.3 9.4 -0.1 1.1 0 2.2 0 3.4 0 64.5 0 128.9 0 193.4 0 1.3 0 2.6 0 3.8 -0.2 4.5-2.8 7.5-7.1 8.4 -1.2 0.3-2.5 0.2-3.8 0.2 -6.7 0-13.4 0-20.2 0 -1 0-1.9 0-2.9-0.1 -4.8-0.5-7.9-3.7-8.3-8.4 -0.1-1.6-0.1-3.2-0.1-4.8 0-40.3 0-80.6 0-120.9 0-1.8 0.8-3.8-0.8-5.3 -1.6 0.9-2.3 2.6-3.3 4 -14.6 20.2-29.3 40.4-43.9 60.6 -2.1 2.9-4.3 5.6-7.7 7 -6.9 2.9-14.4 1.2-18.9-4.8 -3.9-5.1-7.5-10.3-11.3-15.5 -20.9-28.9-41.8-57.7-62.7-86.6 -5.7-7.9-11.4-15.8-17.1-23.7 -1.9-2.6-3.2-5.5-3.7-8.7 -1-6.1 2.7-10.8 8.8-11.2 2.7-0.2 5.4 0 8.2 0 7 0 14.1 0.1 21.1-0.1 4.8-0.1 8.2 1.6 10.9 5.5 8.1 11.5 16.4 22.8 24.7 34.2 10.3 14.2 20.6 28.5 30.9 42.7C870.3 147.4 871.1 148.4 872.3 149.8z"></path><path class="logo-fg" d="M1085.5 64c15.4 0 30.7-0.2 46.1 0.1 25.4 0.5 45.2 11.4 58.9 32.8 6.4 10 9.6 21.2 10.2 33.1 0.3 6.4 0.4 12.8-0.1 19.2 -1.1 14.4-5.9 27.4-15.1 38.7 -13.8 16.9-31.9 25.2-53.5 25.5 -19.5 0.3-39 0.1-58.5 0.1 -5 0-4.7-0.3-4.7 4.6 0 17.6 0 35.2 0 52.8 0 1.9 0.1 3.8-0.6 5.7 -1.2 3.3-3.5 5.3-6.9 5.9 -1.1 0.2-2.2 0.2-3.3 0.2 -7 0-14.1 0-21.1 0 -1.4 0-2.9 0-4.3-0.5 -3.7-1.3-5.9-3.7-6.2-7.7 -0.1-1.1-0.1-2.2-0.1-3.4 0-30.1 0-60.1 0-90.2 0-1 0-1.9 0-2.9 0.3-5 3.6-8.2 8.6-8.6 1.4-0.1 2.9 0 4.3 0 30.2 0 60.5 0 90.7 0 6.7 0 12.6-1.8 17.8-5.9 6-4.8 9.6-11 10.5-18.7 0.5-4.6 0.5-9.2-0.1-13.9 -1.5-13-12.8-23.9-26.7-24.2 -1.3 0-2.6 0-3.8 0 -29.6 0-59.2 0-88.8 0 -1.3 0-2.6 0.1-3.8 0 -5.3-0.4-8.7-4-8.7-9 0-5 0-9.9 0-14.9 0-3.2 0.1-6.4 0-9.6 -0.1-5 3.7-9 9.1-9.2 1.1 0 2.2 0 3.4 0C1054.1 64 1069.8 64 1085.5 64z"></path><path class="logo-fg" d="M191.4 166.9c0 42.4 0 84.8 0 127.2 0 1.4 0.1 2.9 0 4.3 -0.3 4.1-2.9 6.9-6.9 7.3 -1.7 0.2-3.5 0.2-5.3 0 -3.7-0.4-6.5-3.1-7-6.8 -0.2-1.6-0.1-3.2-0.1-4.8 0-53.9 0-107.8 0-161.7 0-31.4 0-62.7 0-94.1 0-1.4-0.1-2.9 0.1-4.3 0.5-3.7 3.2-6.4 7-6.8 1.7-0.2 3.5-0.2 5.3 0 4 0.4 6.7 3.2 7 7.3 0.1 1.4 0 2.9 0 4.3C191.4 81.5 191.4 124.2 191.4 166.9z"></path><path class="logo-fg" d="M298.4 166.2c0-31.5 0-63 0-94.5 0-1.3 0-2.6 0-3.8 0.2-4.1 2.8-6.9 6.8-7.3 1.9-0.2 3.9-0.2 5.7 0 3.6 0.5 6.1 3 6.6 6.6 0.2 1.3 0.1 2.6 0.1 3.8 0 63.7 0 127.3 0 191 0 1 0 1.9 0 2.9 -0.3 3.7-2.2 6.3-5.8 7.4 -2.8 0.8-5.7 0.8-8.5-0.2 -3.1-1.2-4.9-3.5-5-6.9 0-1.3 0-2.6 0-3.8C298.4 229.6 298.4 197.9 298.4 166.2z"></path><path class="logo-fg" d="M87.5 129.3c0.2 1.8-0.6 3.3-1.5 4.8 -2.6 4.4-5.2 8.8-7.9 13.2C72 157.4 66 167.5 59.7 177.6c-1.4 2.3-1.2 3.9 0.2 6.1 8.2 13.3 16.2 26.8 24.3 40.2 0.8 1.4 1.7 2.7 2.4 4.2 2.1 4.1 1.3 8-2.3 10.6 -3 2.2-6.1 4.2-9.3 5.9 -4.3 2.4-8.5 1.2-11.2-3 -3.5-5.5-6.8-11.2-10.2-16.8 -7.7-12.9-15.5-25.7-23.2-38.6 -0.7-1.2-1.5-2.4-1.8-3.9 -0.5-2.7 0.2-5 1.6-7.3 4.9-8.1 9.7-16.2 14.5-24.2 5.8-9.7 11.7-19.4 17.6-29.1 0.7-1.1 1.3-2.2 2.1-3.2 2.4-2.8 6.3-3.8 9.5-2.1 3.4 1.8 6.7 3.8 9.9 5.9C86.2 123.9 87.6 126.2 87.5 129.3z"></path><path class="logo-fg" d="M459.3 180.6c-0.2 2.4-1 4.1-2 5.8 -2.2 3.7-4.4 7.4-6.7 11.1 -8.6 14.2-17.2 28.4-25.8 42.7 -0.5 0.8-0.9 1.7-1.5 2.4 -2.5 3.1-6.4 4.1-9.9 2.3 -3.3-1.7-6.4-3.6-9.5-5.6 -4.2-2.8-5.2-7.2-2.6-11.7 2.1-3.8 4.4-7.4 6.6-11.1 6.5-10.8 13-21.6 19.5-32.4 0.3-0.5 0.6-1.1 1-1.7 0.8-1.1 0.6-2-0.1-3.1 -2.8-4.6-5.5-9.3-8.3-14 -6-10-12.1-20-18.1-29.9 -0.6-1-1.2-1.9-1.6-3 -1.4-3.6-0.6-7.1 2.6-9.4 3.1-2.3 6.3-4.3 9.6-6.3 4-2.3 8.2-1.2 10.9 2.7 1.3 1.8 2.4 3.8 3.5 5.7 9.9 16.4 19.8 32.8 29.7 49.3 0.7 1.1 1.3 2.2 1.8 3.4C459 178.8 459.2 179.9 459.3 180.6z"></path><path class="logo-fg" d="M235.1 249.5c0-25.6 0-51.2 0-76.8 0-1.6-0.1-3.2 0.1-4.8 0.4-4.2 2.9-6.7 6.9-7.4 0.8-0.1 1.6-0.2 2.4-0.2 6.7-0.3 10.4 3.2 10.2 9.7 0 1.1 0 2.2 0 3.4 0 50.9 0 101.7 0 152.6 0 1.6 0 3.2-0.1 4.8 -0.4 4.6-2.9 7.4-7.4 8 -1.6 0.2-3.2 0.2-4.8 0 -4.5-0.7-7-3.6-7.3-8.2 -0.1-1.3 0-2.6 0-3.8C235.1 301 235.1 275.3 235.1 249.5z"></path><path class="logo-fg" d="M223 172.2c0 25.4 0 50.8 0 76.3 0 1.4 0.1 2.9 0 4.3 -0.3 3.5-2.8 6.2-6.3 6.9 -2.1 0.4-4.1 0.4-6.2 0.1 -4-0.6-6.6-3.4-6.9-7.4 -0.1-1.1 0-2.2 0-3.4 0-51.3 0-102.7 0-154 0-1.3-0.1-2.6 0.1-3.8 0.5-3.9 3.4-6.7 7.3-7.1 1.4-0.1 2.9-0.1 4.3 0 4.7 0.3 7.6 3.3 7.8 8 0 1.1 0 2.2 0 3.4C223 121.1 223 146.7 223 172.2z"></path><path class="logo-fg" d="M807.3 245.1c0 8.8 0 17.6 0 26.4 0 7.8-3.3 11-11.1 11.1 -6.9 0-13.8 0-20.6 0 -0.6 0-1.3 0-1.9 0 -5.1-0.4-8.5-3.8-9-8.9 -0.1-0.8 0-1.6 0-2.4 0-17.8 0-35.5 0-53.3 0-1.6-0.1-3.2 0.4-4.8 1.3-4.2 4-6.5 8.4-6.6 8.3-0.1 16.6-0.1 24.9 0 5.1 0.1 8.4 3.2 8.9 8.2 0.1 1.1 0 2.2 0 3.4C807.3 227.2 807.3 236.2 807.3 245.1z"></path><path class="logo-fg" d="M140.4 182.7c0-21.4 0-42.8 0-64.2 0-0.8 0.1-1.6 0-2.4 -1-9.8 9.5-11.8 15.5-8.8 2.3 1.2 3.6 3.2 4 5.7 0.2 1.4 0.2 2.9 0.2 4.3 0 43.8 0 87.6 0 131.4 0 1.6 0 3.2-0.3 4.8 -0.6 3.4-3 5.7-6.3 6.3 -2.1 0.4-4.1 0.4-6.2 0 -4-0.7-6.5-3.5-6.8-7.5 -0.1-1.1 0-2.2 0-3.4C140.4 226.8 140.4 204.8 140.4 182.7z"></path><path class="logo-fg" d="M286.3 166.9c0 16 0 32 0 48 0 1.4 0.1 2.9-0.1 4.3 -0.5 4.2-3.3 7-7.5 7.5 -1.4 0.2-2.9 0.2-4.3 0 -4.3-0.4-7-3-7.7-7.3 -0.2-1.3-0.2-2.5-0.2-3.8 0-32.8 0-65.6 0-98.4 0-1.4 0-2.9 0.3-4.3 0.7-3.6 3-5.9 6.6-6.7 2.1-0.4 4.1-0.4 6.2 0.1 3.7 0.9 6.1 3.5 6.6 7.3 0.2 1.4 0.1 2.9 0.1 4.3C286.3 134.3 286.3 150.6 286.3 166.9z"></path><path class="logo-fg" d="M329.6 172.2c0-14.6 0-29.1 0-43.7 0-1.3-0.1-2.6 0.1-3.8 0.4-3.8 3.4-7.3 7.6-7.3 1.4 0 2.9 0 4.3 0 3.6 0 7 2.6 7.7 7.2 0.2 1.1 0.1 2.2 0.1 3.4 0 29.4 0 58.8 0 88.3 0 0.3 0 0.6 0 1 0.2 3.6-0.9 6.9-4.2 8.5 -3.9 1.9-8.1 1.9-11.9-0.4 -2.1-1.3-3.3-3.5-3.5-6 -0.1-1.3-0.1-2.6-0.1-3.8C329.6 201 329.6 186.6 329.6 172.2z"></path><path class="logo-fg" d="M128.5 177.5c0 5.9 0 11.8 0 17.7 0 1.1 0.1 2.2-0.1 3.3 -0.5 3.8-3 6.4-6.8 7.1 -0.5 0.1-1 0.1-1.4 0.2 -7.3 0.6-11.5-2.2-11.5-10.4 0-11.8 0-23.6 0-35.4 0-1.3 0.1-2.6 0.4-3.8 0.8-3.9 3.1-6.2 7.1-6.7 1.7-0.2 3.5-0.2 5.2 0.1 4.2 0.6 6.7 3.5 7.1 7.8 0.1 1.1 0 2.2 0 3.4C128.5 166.3 128.5 171.9 128.5 177.5z"></path><path class="logo-fg" d="M380.6 178c0 6.2 0 12.4 0 18.7 0 1.9-0.2 3.7-1.2 5.5 -2.6 4.8-14 5.2-17.1-0.3 -1-1.7-1.1-3.6-1.1-5.5 0-7.7 0-15.3 0-23 0-5.1 0-10.2 0-15.3 0-2.3 0.6-4.4 2.3-6.1 0.7-0.7 1.4-1.3 2.3-1.7 3.4-1.3 6.9-1.4 10.3-0.1 2.6 1 4.1 3 4.4 5.8 0.2 1.3 0.1 2.5 0.1 3.8C380.7 165.9 380.6 171.9 380.6 178z"></path><path class="logo-fg" d="M804.6 330.4c-2.1 1.3-2.7 2.8-3.7 4 -1.1 1.3-2.1 2.8-3.2 4.2 -2.9 3.8-3 3.8-6-0.2 -0.2-0.3-0.3-0.6-0.5-0.8 -1.9-2-2.7-5-5.4-6.3 -0.9 2.6-0.3 5.3-0.4 8 -0.1 2.9 0 5.8 0 8.6 0 0.7-0.1 1.5-0.8 1.6 -1.4 0.2-2.9 0.2-4.3 0.1 -0.2 0-0.6-0.7-0.6-1.2 -0.1-0.9-0.1-1.9-0.1-2.9 0-6.7 0-13.4 0-20.1 0-1.1 0-2.2 0.1-3.3 0-0.4 0.3-0.9 0.9-0.9 1.6 0 3.2-0.1 4.8 0 0.9 0 1.4 0.8 1.8 1.4 1.6 2.2 3.2 4.4 4.8 6.6 0.6 0.8 1.1 1.6 1.7 2.3 1 1.2 1.5 1.2 2.6-0.2 1.2-1.7 2.4-3.4 3.6-5 0.9-1.3 1.9-2.6 2.8-3.9 0.6-0.8 1.4-1.3 2.4-1.3 4.7 0 4.9-0.5 4.9 4.5 0 6.7 0 13.4 0 20.1 0 0.8 0 1.6-0.1 2.4 -0.1 1.2-0.8 1.7-1.9 1.6 -0.3 0-0.6 0-1 0 -2.3 0-2.5-0.2-2.6-2.3 0-3.8 0-7.7 0-11.5C804.6 334.4 804.6 332.8 804.6 330.4z"></path><path class="logo-fg" d="M1221.7 332.3c1.4-0.9 2.2-2.5 3.2-3.9 1.5-1.9 2.8-3.9 4.2-5.8 0.7-1 1.6-1.6 2.8-1.5 1.1 0 2.2 0 3.4 0.1 0.7 0 1.2 0.4 1.3 1.1 0.1 0.6 0.1 1.3 0.1 1.9 0 7.5 0 15 0 22.5 0 0.6 0 1.3-0.1 1.9 -0.1 0.7-0.6 1.1-1.3 1.1 -0.2 0-0.3 0-0.5 0 -3.5 0.2-3.8 0-3.8-3.6 0-4.6 0-9.3-0.1-13.9 0-0.3-0.1-0.7-0.4-0.8 -0.5-0.4-0.9 0-1.2 0.3 -2.3 2.9-4.4 5.9-6.7 8.7 -0.9 1.1-1.7 1.1-2.7-0.1 -0.6-0.7-1.2-1.5-1.7-2.3 -1.4-1.9-2.8-3.9-4.3-5.8 -0.3-0.4-0.5-0.8-0.9-1.1 -0.2-0.2-0.6-0.2-0.8-0.1 -0.4 0-0.5 0.3-0.5 0.7 0 1.1 0 2.2 0 3.4 0 3.8 0 7.7 0 11.5 0 2.9-1.3 3.8-4.3 3 -0.4-0.1-0.8-0.6-0.9-1 -0.2-0.6-0.2-1.3-0.2-1.9 0-7.5 0-15 0-22.5 0-0.6 0-1.3 0.1-1.9 0.1-0.6 0.4-1.2 1.2-1.2 0.6 0 1.3 0 1.9-0.1 2.1-0.3 3.6 0.5 4.8 2.3 1.6 2.6 3.5 4.9 5.3 7.4C1220.2 331.4 1220.6 332.2 1221.7 332.3z"></path><path class="logo-fg" d="M1196.3 340.1c2.6 3 5 5.9 7.5 8.8 -4.1 1.6-5.9 1.3-8.4-1.5 -1.5-1.7-3.1-3.3-4.4-5.1 -1.3-1.8-3-2.2-5-2 -1 0.1-1.5 0.6-1.6 1.4 -0.1 2.1-0.1 4.1-0.1 6.2 0 1.1-0.6 1.8-1.7 1.8 -1.3 0-2.5 0.2-3.7-0.4 -0.1-0.5-0.3-1-0.3-1.4 0-8.1 0-16.3 0-24.4 0-2.3 0.2-2.4 2.5-2.5 3.8 0 7.7 0 11.5 0 0.8 0 1.6 0 2.4 0.2 6.6 1.3 10 8.6 6.6 14.5 -0.6 1-1.4 1.8-2.3 2.4C1198.4 338.8 1197.5 339.4 1196.3 340.1z"></path><path class="logo-fg" d="M544.7 335.1c0-4 0-8 0-12 0-1.6 0.5-2 2-2 3.7-0.1 7.4-0.2 11 0 7.6 0.4 12.6 5.8 12.8 13.5 0.1 2.2-0.1 4.4-0.9 6.6 -2 5.2-5.8 8-11.1 8.5 -4 0.4-8 0.1-12 0.1 -1.4 0-1.8-0.5-1.8-2.2C544.6 343.4 544.7 339.3 544.7 335.1 544.7 335.1 544.7 335.1 544.7 335.1z"></path><path class="logo-fg" d="M898.7 335.2c0-4 0-8 0-12 0-1.6 0.4-2.1 1.9-2.1 3.8 0 7.7-0.2 11.5 0.1 7.4 0.6 12.2 5.9 12.4 13.3 0.1 2.2-0.1 4.4-0.9 6.6 -1.9 5-5.5 7.9-10.6 8.5 -4.3 0.5-8.6 0.2-12.9 0.1 -0.9 0-1.4-0.7-1.4-1.6C898.7 343.9 898.8 339.5 898.7 335.2 898.7 335.2 898.7 335.2 898.7 335.2z"></path><path class="logo-fg" d="M814.7 335.4c0-4 0-8 0-12 0-1.8 0.5-2.3 2.3-2.3 5.9 0 11.8 0 17.8 0 0.9 0 1.5 0.5 1.6 1.4 0.1 0.6 0.1 1.3 0 1.9 -0.1 1.8-0.4 2.2-2.3 2.2 -3.8 0-7.7 0-11.5 0 -1.6 0-1.9 0.4-2 2 0 0.6 0 1.3 0 1.9 0 2 0.2 2.2 2.2 2.2 3.7 0 7.4 0 11 0 1.7 0 2.1 0.6 2.1 2.4 0 2.2-0.4 2.8-2.3 2.8 -3.7 0.1-7.4 0-11 0.1 -1.6 0-2 0.4-2.1 2 -0.1 4.7 0 4.3 4.1 4.3 3.4 0 6.7 0 10.1 0 0.9 0 1.5 0.5 1.6 1.4 0.1 0.8 0 1.6 0 2.4 0 0.9-0.4 1.6-1.4 1.6 -6.2 0-12.5 0-18.7 0 -1.2 0-1.6-0.8-1.6-1.9C814.7 343.7 814.7 339.5 814.7 335.4 814.7 335.4 814.7 335.4 814.7 335.4z"></path><path class="logo-fg" d="M1145.3 335.6c0.1-1.7 0.1-3.4 0.7-5.1 2.6-7.5 8.1-10.2 15.1-9.9 8.5 0.4 13.6 6.2 13.7 14.7 0 2.4-0.2 4.8-1.2 7 -2.3 5.2-6.5 7.8-11.9 8.2 -6.7 0.6-13.3-2.2-15.7-9.7C1145.4 339.1 1145.3 337.4 1145.3 335.6z"></path><path class="logo-fg" d="M584.6 335.7c0-1-0.1-1.9 0-2.9 1-5.4 4-10.4 10.3-11.8 7.8-1.8 14 1.3 16.8 6 3.3 5.5 2.9 13.9-1.3 18.8 -3.3 3.8-7.7 4.9-12.5 4.7 -1.6 0-3.2-0.5-4.7-1 -5.3-2-8-6.1-8.8-11.5C584.5 337.3 584.6 336.5 584.6 335.7 584.6 335.7 584.6 335.7 584.6 335.7z"></path><path class="logo-fg" d="M1007.9 349.3c-1.6 0.7-2.9 0.4-4.2 0.5 -1.3 0-2.1-0.5-2.5-1.8 -0.2-0.8-0.6-1.5-1-2.2 -0.3-0.7-0.9-1-1.5-1 -4.2 0-8.3-0.1-12.5-0.1 -1.1 0-1.9 0.7-2.1 1.6 -0.9 3.5-3.4 3.7-6.3 3.3 -0.3 0-0.6-0.2-1-0.3 0.3-2.4 1.7-4.4 2.6-6.6 2.8-6.4 5.8-12.8 8.6-19.2 0.8-1.9 2-2.7 4-2.5 0.6 0.1 1.3 0 1.9 0 0.9 0 1.5 0.5 1.9 1.2 0.3 0.6 0.5 1.2 0.8 1.7 3.3 7.4 6.7 14.9 10 22.3C1007.2 347.2 1007.5 348.1 1007.9 349.3z"></path><path class="logo-fg" d="M744.5 349.6c-1.1 0.1-1.8 0.1-2.4 0.2 -2.6 0.4-4.3-0.5-5-3.1 -0.4-1.4-1.4-2-2.9-2 -3.5 0.1-7 0-10.5 0 -1.4 0-2.7 0.3-3 1.8 -0.9 3.6-3.5 3.6-6.4 3.2 -0.3 0-0.5-0.3-0.8-0.4 -0.2-0.9 0.2-1.5 0.5-2.3 3.5-7.7 7-15.4 10.4-23.1 0.9-2 2-3.2 4.3-2.8 0.5 0.1 1 0 1.4 0 1.2 0 2.1 0.5 2.6 1.7 0.8 2.1 1.8 4.1 2.7 6.1 2.7 6.1 5.4 12.2 8.1 18.4C743.9 347.9 744.1 348.5 744.5 349.6z"></path><path class="logo-fg" d="M514.6 349.6c-1.2 0.1-1.9 0.1-2.5 0.2 -2.3 0.2-4.1-0.2-4.7-2.8 -0.5-1.8-1.8-2.4-3.7-2.3 -3.4 0.1-6.7 0.1-10.1 0 -1.7 0-2.8 0.6-3.2 2.2 -0.1 0.3-0.3 0.6-0.4 0.9 -0.4 1.5-1.3 2.1-2.8 2 -1.1 0-2.2 0-3.1 0 -0.9-1-0.4-1.8-0.1-2.4 3.5-8 7.1-16 10.7-24.1 0.8-1.7 1.9-2.2 3.7-2.3 2.7-0.2 4.3 0.6 5 3.3 0.1 0.5 0.4 0.8 0.6 1.3 3.2 7.1 6.4 14.3 9.6 21.4C514 347.7 514.2 348.4 514.6 349.6z"></path><path class="logo-fg" d="M895.5 349.5c-1.2 0.6-2.5 0.3-3.8 0.4 -1.3 0.1-2.1-0.6-2.5-1.7 -0.2-0.4-0.4-0.9-0.5-1.3 -0.6-1.6-1.8-2-3.4-2 -3.4 0-6.7 0.1-10.1 0 -1.7-0.1-2.8 0.5-3.3 2 -0.2 0.6-0.5 1.2-0.8 1.8 -0.3 0.8-1 1.3-1.8 1.3 -1.4 0-2.8 0.3-4.2-0.3 -0.3-0.9 0-1.6 0.4-2.3 3.5-7.9 7.1-15.7 10.5-23.6 0.8-1.9 2-2.5 4-2.5 2.4 0 3.7 0.7 4.7 3 3.3 7.8 6.9 15.4 10.4 23.1C895.4 347.9 895.7 348.6 895.5 349.5z"></path><path class="logo-fg" d="M1067.8 347.1c2.5-5.5 5.1-11 7.6-16.5 1.1-2.5 2.2-4.9 3.3-7.4 0.6-1.5 1.7-2.2 3.3-2.1 0.8 0.1 1.6 0 2.4 0 1.1 0 1.8 0.5 2.2 1.5 0.8 1.8 1.5 3.5 2.3 5.3 2.7 6 5.4 11.9 8 17.9 0.5 1.1 1.3 2.2 1.2 3.6 -0.8 0.7-1.8 0.4-2.7 0.5 -2 0.3-3.4-0.4-4-2.5 -0.6-2-1.8-2.8-3.9-2.7 -3.3 0.2-6.7 0.1-10.1 0 -1.4 0-2.5 0.5-3 1.9 -0.2 0.6-0.6 1.1-0.8 1.7 -0.4 1-1.1 1.5-2.1 1.5 -1.3 0-2.6 0-3.8 0C1066.9 348.8 1066.8 347.9 1067.8 347.1z"></path><path class="logo-fg" d="M956.2 349.7c-1 0.1-1.8 0-2.6 0.1 -2.3 0.3-3.6-0.6-4.2-2.8 -0.5-1.8-1.8-2.4-3.6-2.3 -3.4 0.1-6.7 0.1-10.1 0 -1.6 0-2.8 0.6-3.3 2.1 -0.2 0.6-0.5 1.2-0.8 1.7 -0.4 0.8-1 1.2-1.9 1.2 -1.3 0-2.5 0-3.5 0 -0.9-0.7-0.6-1.4-0.4-1.9 3.6-8 7.3-16 10.7-24 1-2.4 2.5-2.9 4.8-2.8 1.8 0 3 0.5 3.7 2.3 3.6 8.3 7.4 16.6 11 24.9C956.2 348.5 956.1 348.9 956.2 349.7z"></path><path class="logo-fg" d="M669.5 320.1c2-0.3 4 0.4 5.9 1 1.8 0.6 3.5 1.6 4.5 3.4 0.2 0.4 0.5 0.8 0.3 1.3 -0.7 1.3-3.3 2.3-4.6 1.6 -0.8-0.5-1.5-1.2-2.4-1.6 -2.4-1.1-5-1.2-7.4 0 -1.2 0.6-2.1 2-1.9 3.1 0.2 1.2 1 2 2.2 2.3 1.2 0.3 2.5 0.5 3.7 0.8 2.3 0.6 4.7 1 7 1.8 3.2 1.1 4.7 3.7 4.9 7 0.2 3.5-1 6.3-4.2 8 -5 2.6-10.1 2.6-15.3 0.5 -1.4-0.5-2.5-1.5-3.4-2.6 -0.7-0.9-1.5-1.8-1.4-3 0-0.7 2.6-2.1 3.6-2.2 0.7 0 1.1 0.4 1.5 1 1.5 1.9 3.5 2.6 5.8 3.1 2 0.4 3.8-0.1 5.6-0.9 1.2-0.5 2.1-1.6 2.1-3 0.1-1.4-0.8-2.3-2-3.1 -1.4-0.9-3-1-4.6-1.3 -2.2-0.3-4.5-0.5-6.5-1.5 -3.8-1.8-5.3-5-4.4-9.1 0.5-2.6 2.2-4.2 4.5-5.3C664.9 320.5 667.1 319.9 669.5 320.1z"></path><path class="logo-fg" d="M1018.4 335.4c0-4.1 0-8.3 0-12.4 0-1.1 0.5-1.8 1.7-1.8 4.5 0 8.9-0.2 13.4 0.1 5.6 0.3 9.2 4.7 9.1 10.3 -0.1 5.4-3.7 9.4-9.1 9.8 -1.7 0.2-3.5 0-5.3 0.1 -4 0-4 0.1-4.1 3.9 0 1 0 1.9 0 2.9 0 1.1-0.7 1.7-1.8 1.7 -0.8 0-1.6 0-2.4 0 -1 0-1.4-0.7-1.4-1.5 0-1 0-1.9 0-2.9C1018.4 342 1018.4 338.7 1018.4 335.4 1018.4 335.4 1018.4 335.4 1018.4 335.4z"></path><path class="logo-fg" d="M514.7 330.5c0-2.2 0-4.5 0-6.7 0.1-2.4 0.3-2.7 2.8-2.7 0.6 0 1.3 0 1.9 0.1 0.4 0.1 0.8 0.6 0.9 0.9 0.2 0.8 0.2 1.6 0.2 2.4 0 4 0 8 0 12 0 1-0.1 1.9 0.1 2.9 0.5 3.2 2.8 5.4 6.1 5.8 3.5 0.4 5.9-0.9 7.3-4.1 0.7-1.5 0.7-3.1 0.7-4.7 0-4.5 0-8.9 0-13.4 0-1.6 0.4-1.9 2-1.9 0.8 0 1.6 0 2.4 0.1 0.7 0.1 1.1 0.5 1.2 1.3 0 0.2 0.1 0.3 0.1 0.5 -0.1 5.4 0.4 10.9-0.3 16.3 -0.1 1.1-0.3 2.2-0.6 3.3 -1 3.6-3.4 6.1-7 7.2 -3.1 1-6.3 1.1-9.4 0 -3.9-1.3-6.5-3.8-7.6-7.9 -0.5-1.7-0.7-3.4-0.7-5.2C514.8 334.6 514.7 332.6 514.7 330.5z"></path><path class="logo-fg" d="M710.7 331.6c0 2.6 0.1 5.1 0 7.7 -0.2 7.2-5.4 11.7-13.2 11.2 -7.7-0.5-11.8-5.1-11.9-12.9 -0.1-4.6 0-9.3 0-13.9 0-2.4 0.3-2.6 2.8-2.6 2.3 0 2.6 0.3 2.7 2.9 0 3.7 0 7.4 0 11 0 1.6 0.1 3.2 0.3 4.8 0.6 3.3 3 5.2 6.3 5.5 3.4 0.3 5.8-1.4 7-4.6 0.6-1.7 0.7-3.4 0.7-5.2 0-4.2 0-8.3 0-12.5 0-1.5 0.5-1.9 2.1-1.9 0.2 0 0.3 0 0.5 0 2.3 0 2.6 0.2 2.7 2.3C710.7 326.1 710.7 328.9 710.7 331.6 710.7 331.6 710.7 331.6 710.7 331.6z"></path><path class="logo-fg" d="M629.4 341.6c1.3-1.1 1.5-2.8 2.1-4.2 1.8-4.6 3.6-9.2 5.3-13.8 0.6-1.7 1.6-2.6 3.5-2.4 0.9 0.1 1.9 0.1 2.7 0.1 0.6 0.8 0.5 1.4 0.3 2 -3.4 8.3-6.7 16.5-10.2 24.8 -0.4 0.8-0.7 1.9-1.9 1.9 -1.6 0.1-3.2 0.5-4.7-0.3 -0.4-0.2-0.7-0.7-0.8-1.1 -3.5-8.5-7-17.1-10.5-25.7 -0.2-0.4-0.1-0.9-0.2-1.5 0.9-0.1 1.6-0.2 2.4-0.2 3.3 0 3.3 0 4.5 3 2 5 3.9 10.1 5.9 15.2C628.3 340.1 628.5 341.1 629.4 341.6z"></path><path class="logo-fg" d="M1121.3 335.6c0-4.2 0-8.3 0-12.5 0-1.5 0.5-2 2-2 5.6 0 11.2 0 16.8 0 1.8 0 2.2 0.5 2.2 2.3 0 0.5 0 1 0 1.4 0 1.1-0.7 1.8-1.8 1.8 -3.7 0-7.3 0-11 0.1 -2.2 0-2.4 0.3-2.4 2.6 0 0.3 0 0.6 0 1 0 3.7 0 3.7 3.7 3.8 2.9 0 5.8 0 8.6 0.1 1.5 0 1.9 0.6 2 2.1 0 0.2 0 0.3 0 0.5 0 2.1-0.4 2.6-2.4 2.7 -3.2 0.1-6.4 0-9.6 0.1 -1.9 0-2.3 0.5-2.4 2.2 -0.1 2.1 0 4.2-0.1 6.2 0 1.5-0.5 1.9-2.1 1.9 -0.5 0-1 0-1.4 0 -1.9-0.1-2.2-0.3-2.2-2.3C1121.2 343.5 1121.3 339.5 1121.3 335.6 1121.3 335.6 1121.3 335.6 1121.3 335.6z"></path><path class="logo-fg" d="M1103.4 338c0-3.2 0-6.4 0-9.6 0-2.1-0.4-2.3-2.6-2.4 -1.3 0-2.6 0-3.8 0 -0.8 0-1.6 0.1-2.2-0.6 -0.4-0.5-0.4-3.2 0-3.7 0.4-0.5 1.1-0.6 1.7-0.6 6.5 0 13.1 0 19.6 0 0.2 0 0.3 0 0.5 0 1.1 0.1 1.6 0.7 1.7 1.9 0.2 2.4-0.2 2.9-2.5 3 -1.3 0-2.6 0-3.8 0 -2.4 0.1-2.7 0.3-2.7 2.8 -0.1 5.3 0 10.5 0 15.8 0 1.3 0 2.6-0.1 3.8 -0.1 1.2-0.6 1.4-3.1 1.3 -1.1 0-2.4 0.3-2.6-1.3 -0.1-0.8-0.1-1.6-0.1-2.4C1103.4 343.4 1103.4 340.7 1103.4 338 1103.4 338 1103.4 338 1103.4 338z"></path><path class="logo-fg" d="M961.7 337.9c0-3.3 0-6.7 0-10 0-1.1-0.6-1.8-1.8-1.8 -1.9 0-3.8 0-5.7 0 -1.2 0-1.6-0.7-1.7-1.8 -0.1-2.7 0.2-3.1 2.9-3.1 6.2 0 12.4 0 18.7 0 2.2 0 2.5 0.3 2.5 2.4 0 2.2-0.2 2.4-2.4 2.5 -1.8 0-3.5 0-5.3 0.1 -0.7 0-1.2 0.5-1.3 1.2 -0.1 1.1-0.2 2.2-0.2 3.3 0 5.4 0 10.8 0 16.3 0 2.7-0.3 2.9-3.1 2.9 -0.2 0-0.3 0-0.5 0 -1.6-0.1-2.1-0.4-2.1-1.9C961.7 344.6 961.8 341.2 961.7 337.9 961.7 337.9 961.7 337.9 961.7 337.9z"></path><path class="logo-fg" d="M849.6 338.1c0-3.4 0-6.7 0-10.1 0-1.6-0.4-2-2-2 -1.8-0.1-3.5 0-5.3 0 -1.2 0-1.7-0.7-1.7-1.8 0-0.3 0-0.6 0-1 0.1-1.6 0.5-2.1 1.9-2.1 6.6 0 13.1 0 19.7 0 0.8 0 1.7 0.1 1.9 1 0.3 1.1 0.4 2.2-0.2 3.2 -0.2 0.3-0.8 0.6-1.2 0.6 -1.9 0.1-3.8 0.1-5.8 0.1 -0.9 0-1.5 0.6-1.5 1.5 -0.1 1.3-0.1 2.6-0.1 3.8 0 5.4 0 10.9 0 16.3 0 1.6-0.4 2-2 2 -0.5 0-1 0-1.4 0 -2 0-2.3-0.2-2.3-2.1 0-2.4 0-4.8 0-7.2C849.6 339.7 849.6 338.9 849.6 338.1 849.6 338.1 849.6 338.1 849.6 338.1z"></path><path class="logo-fg" d="M1066.4 349.7c-6.1 0.1-12.1 0.1-18.2 0.1 -1.8 0-2.2-0.4-2.2-2.3 0-7.8 0-15.7 0-23.5 0-2.8 0.3-3 3-3 2.2 0 2.4 0.2 2.4 2.5 0 5.3 0 10.5 0 15.8 0 1.3 0 2.6 0.1 3.8 0.1 0.9 0.7 1.4 1.6 1.5 2.9 0 5.7 0 8.6 0.1 1 0 1.9 0 2.9 0 1.5 0 1.8 1.1 2 2.2C1067.2 347.9 1067.5 348.8 1066.4 349.7z"></path><path class="logo-fg" d="M747.3 335.1c0-3.7 0-7.3 0-11 0-2.9 0.4-3.2 3.4-3 0.3 0 0.6 0.1 0.9 0.1 0.7 0.1 1.1 0.6 1.2 1.3 0.1 0.9 0.1 1.9 0.1 2.9 0 4.6 0 9.2 0 13.9 0 1 0 1.9 0 2.9 0.1 2.1 0.5 2.5 2.5 2.6 1.1 0 2.2 0 3.3 0 2.1 0 4.1 0 6.2 0 2.3 0 2.6 0.5 2.6 2.9 -0.1 1.8-0.4 2.2-2.3 2.2 -5.3 0-10.5 0-15.8 0 -1.8 0-2.2-0.4-2.2-2.3C747.3 343.4 747.3 339.3 747.3 335.1 747.3 335.1 747.3 335.1 747.3 335.1z"></path><path class="logo-fg" d="M647.2 335.6c0-3.8 0-7.6 0-11.5 0-2.9 0.4-3.2 3.4-3.1 0.2 0 0.3 0 0.5 0 1.2 0.1 1.7 0.8 1.7 1.9 0 3.3 0 6.7 0 10 0 4.8 0 9.6 0 14.3 0 2.2-0.3 2.5-2.4 2.5 -0.5 0-1 0-1.4 0 -1.2 0-1.7-0.7-1.7-1.8 0-2.7 0-5.4 0-8.1C647.2 338.5 647.2 337 647.2 335.6z"></path><path class="logo-fg" d="M574.4 335c0-4 0-8 0-12 0-1.5 0.5-1.9 2.1-2 0.6 0 1.3 0 1.9 0 0.9 0.1 1.4 0.6 1.6 1.5 0.1 0.5 0.1 1 0.1 1.4 0 7.7 0 15.3 0 23 0 2.7-0.3 2.9-3.1 2.9 -2.2 0-2.5-0.3-2.6-2.4C574.4 343.3 574.4 339.1 574.4 335 574.4 335 574.4 335 574.4 335z"></path><path class="logo-fg" d="M1066.4 349.7c-0.1-0.9-0.3-1.8 0.2-2.7 0.4 0 0.8 0.1 1.2 0.1 0 0.9-0.1 1.8-0.1 2.7C1067.3 349.7 1066.8 349.7 1066.4 349.7z"></path><path class="logo-bg" d="M1189.3 335c-1.1 0-2.2 0-3.3 0 -0.9 0-1.4-0.6-1.6-1.4 0-0.2 0-0.3 0-0.5 0-7.8-0.9-6.6 6.4-6.7 0.8 0 1.6 0 2.4 0.1 2.6 0.4 4 2.1 3.9 4.5 -0.1 2.3-1.5 3.7-3.9 4C1191.8 335.1 1190.6 335 1189.3 335z"></path><path class="logo-bg" d="M550.5 335.6c0-2.4 0-4.8 0-7.2 0-1.4 0.6-2 2.1-2 1.9 0 3.9 0 5.7 0.4 4.3 0.8 6.9 4.6 6.7 9.2 -0.2 4.5-2.9 7.6-7.2 8.3 -0.3 0-0.6 0.1-1 0.1 -7 0-6.4 0.8-6.4-5.9C550.5 337.5 550.5 336.5 550.5 335.6 550.5 335.6 550.5 335.6 550.5 335.6z"></path><path class="logo-bg" d="M908.5 344.3c-0.5 0-1 0-1.4 0 -2.3-0.1-2.6-0.3-2.6-2.4 0-4.4 0-8.9 0-13.3 0-1.8 0.4-2.2 2.3-2.2 1.6 0 3.2 0.1 4.7 0.2 4.9 0.4 7.7 4.7 7.5 9.4 -0.2 4.8-3.2 7.9-8.1 8.3C910 344.4 909.2 344.3 908.5 344.3 908.5 344.3 908.5 344.3 908.5 344.3z"></path><path class="logo-bg" d="M1160 325.7c5.4 0 9.4 4.1 9.2 10 -0.2 5.7-3.2 9.5-8.9 9.7 -5.4 0.2-9.5-3.9-9.5-9.7C1150.8 329.3 1155.1 325.5 1160 325.7z"></path><path class="logo-bg" d="M590 335.3c0.4-4 1.6-7.1 5.2-8.8 3.3-1.5 6.5-1.3 9.5 0.8 5.5 4 4.8 14-1.2 17.1 -5.3 2.7-11.9-0.3-13.1-6.1C590.2 337.2 590.1 336.1 590 335.3z"></path><path class="logo-bg" d="M992.1 328.4c1.8 1.4 2 2.9 2.6 4.2 3.3 7.5 3.5 6.5-4.7 6.6 -1.9 0-2.3-0.5-1.6-2.3C989.5 334.1 990.7 331.4 992.1 328.4z"></path><path class="logo-bg" d="M729.4 328.5c1.3 3.6 3.4 6.6 4 10.2 -0.5 0.2-0.8 0.4-1.1 0.4 -9.6 0.1-9 1.3-5.3-7.2C727.4 330.8 727.6 329.4 729.4 328.5z"></path><path class="logo-bg" d="M498.6 328.8c0.3 0.1 0.7 0.2 0.8 0.3 1.3 2.7 2.6 5.5 3.8 8.2 0.5 1.1-0.1 1.7-1.4 1.8 -1 0-1.9 0-2.9 0 -5.3 0.1-5.2 0-3-4.9C496.7 332.5 497.1 330.4 498.6 328.8z"></path><path class="logo-bg" d="M879.8 328.7c1.7 0.6 1.9 2.1 2.3 3.2 3.8 8.6 3.8 7.3-5.1 7.3 -1 0-1.5-0.7-1.2-1.5C877.1 334.6 878.5 331.6 879.8 328.7z"></path><path class="logo-bg" d="M1087.1 338.9c-2.4 0.5-4.9 0.3-7.4 0.2 -1.2 0-1.6-0.8-1.1-2 1.1-2.6 2.3-5.2 3.5-7.8 0.3-0.6 1.3-0.7 1.5-0.2 1.3 3.1 3.1 5.9 3.8 9.2C1087.3 338.5 1087.2 338.6 1087.1 338.9z"></path><path class="logo-bg" d="M945.5 338.9c-2.7 0.5-5.3 0.3-7.8 0.2 -1 0-1.6-0.7-1.2-1.5 1.2-2.8 2.4-5.5 3.6-8.2 0.3-0.6 1.2-0.7 1.5-0.1C943.1 332.4 944.7 335.4 945.5 338.9z"></path><path class="logo-bg" d="M1028.5 336.3c-1 0-1.9 0-2.9 0 -0.9 0-1.5-0.7-1.5-1.5 -0.1-2.2-0.1-4.5 0-6.7 0-0.9 0.5-1.6 1.4-1.6 2.4 0 4.8-0.2 7.2 0.1 2.8 0.3 4.3 2.3 4.2 4.9 -0.1 2.3-1.7 4.2-4.1 4.7 -1.4 0.3-2.9 0.2-4.3 0.3C1028.5 336.4 1028.5 336.4 1028.5 336.3z"></path></svg>',
    remove: '<svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve"><path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302zM156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path><path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path><path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>'
}

// Menu List

const menus = [
    {
        name: 'Workflows',
        class: 'workflows, workflows',
        icon: icons['workflow'],
        url: "/workflow/submit"
    },
    // {
    //     name: 'Collections',
    //     class: 'collection, collection',
    //     icon: icons['collection'],
    //     url: "/collections"
    // },
    {
        name: 'Units',
        class: 'units, units',
        icon: icons['unit'],
        url: "/unit/details"
    },
    {
        name: 'Dashboard',
        class: 'collections, collections',
        icon: icons['dashboard'],
        url: "/dashboard"
    },
    {
        name: 'Batch Ingest',
        class: 'batch-ingest, batch-ingest',
        icon: icons['batchIngest'],
        url: "/batch/ingest"
    },
    {
        name: 'Deliverables',
        class: 'deliverables, deliverables',
        icon: icons['deliverables'],
        url: "/deliverables"
    }
];

export default {
    common: {
        menus: menus,
        icons: icons
    }
}