<template>
<div class="col-lg-7">
   <h1>Workflow Submissions</h1>
   <h2>Select files</h2>
   <form class="marg-t-3 filter-form">
      <div class="container-fluid">
         <div class="row">
            <div class="col-12">
               <div id="limiter">
                  <strong>Limit results to </strong>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                     <label class="form-check-label" for="inlineCheckbox1">Audio</label>
                  </div>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                     <label class="form-check-label" for="inlineCheckbox2">Video</label>
                  </div>
               </div>
               <button id="select-saved" type="button" class="btn btn-primary float-right" data-toggle="modal" data-target=".select-from-saved-modal">Select from saved bundles</button>
            </div>
         </div>
      </div>
      <div class="form-group ">
         <div class="container-fluid">
            <div class="row">
               <div class="col-12">
                  <div class="input-group mb-3">
                     <label for="exampleFormControlInput100" class="sr-only">Search</label>
                     <input type="text" class="form-control" id="exampleFormControlInput100" placeholder="filter" v-model="searchWord">
                     <div class="input-group-append">
                        <button class="btn" v-on:click="searchFiles()">
                           <svg class="icon-filter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.6 472.6">
                              <polygon points="472.6 12.9 0 12.9 180.1 202.6 180.1 459.7 292.6 401.5 292.5 202.6 "></polygon>
                           </svg>
                           Apply filter
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
     <div>
      </div>
   </form>
   <div>
      <h3>Search Results</h3>
      <div id="accordion">
         <div class="card">
            <div class="card-header" id="headingOne">
               <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                     <svg aria-hidden="true" focusable="false" class="svg-inline dwn-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path class="hotlink" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                     </svg>
                     <span class="sr-only">Toggle hidden content</span>
                     Sample Item Name #1
                  </button>
                  <!-- -->
                  <button class="btn btn-link float-right">
                     <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                        <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                           M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                        <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                        <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                     </svg>
                     Add all files
                  </button>
                  <!-- -->
               </h5>
            </div>
            <div id="collapseOne" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
               <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                  tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                  vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
               </div>
            </div>
         </div>
         <div class="card">
            <div class="card-header" id="headingTwo">
               <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                     <svg aria-hidden="true" focusable="false" class="svg-inline dwn-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path class="hotlink" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                     </svg>
                     <span class="sr-only">Toggle hidden content</span>
                     Sample Item Name #2
                  </button>
                  <!-- -->
                  <button class="btn btn-link float-right">
                     <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                        <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                           M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                        <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                        <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                     </svg>
                     Add all files
                  </button>
                  <!-- -->
               </h5>
            </div>
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
               <div class="card-body">
                  <!-- -->
                  <ul class="list-unstyled file-list">
                     <li>
                        <button class="btn btn-light btn-sm" disabled="">
                           <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link  add-remove float-right" disabled="">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                     <li>
                        <button class="btn btn-light btn-sm" disabled="">
                           <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link add-remove float-right" disabled="">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                     <li>
                        <button class="btn btn-light btn-sm">
                           <svg class="icon-play-audio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link add-remove float-right">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                     <li>
                        <button class="btn btn-light btn-sm">
                           <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link  add-remove float-right">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                     <li>
                        <button class="btn btn-light btn-sm">
                           <svg class="icon-play-audio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link add-remove float-right">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                     <li>
                        <button class="btn btn-light btn-sm">
                           <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           filename.ext
                        </button>
                        <button class="btn btn-link add-remove float-right">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                  </ul>
                  <!-- -->
               </div>
            </div>
         </div>
         <div class="card">
            <div class="card-header" id="headingThree">
               <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                     <svg aria-hidden="true" focusable="false" class="svg-inline dwn-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path class="hotlink" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                     </svg>
                     <span class="sr-only">Toggle hidden content</span>
                     Sample Item Name #3
                  </button>
                  <!-- -->
                  <button class="btn btn-link float-right">
                     <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                        <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                           M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                        <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                        <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                     </svg>
                     Add all files
                  </button>
                  <!-- -->
               </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
               <div class="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                  tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                  vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
<script>
import { sync } from 'vuex-pathify';
import WorkflowService from '../../service/workflow-service';
export default {
	name: 'selectFilesLeft',
    data(){
		return {
		searchAudio : false,
		searchVideo : false,
		searchWord : ''
		}
	},
	methods:{
       searchFiles() {
         let self = this;
         console.log("the search word is:", this.searchWord);
         self.searchedFiles = self.workflowService.searchFiles(this.searchWord).then(response => {
         self.searchedFiles = response.data._embedded.primaryfiles;
         })
         .catch(e => {
         console.log(e);});  
	}
	}
}
</script>