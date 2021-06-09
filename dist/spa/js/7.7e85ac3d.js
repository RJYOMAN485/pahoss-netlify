(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"482d":function(a,t,o){"use strict";o.r(t);var e=function(){var a=this,t=a.$createElement,o=a._self._c||t;return o("div",{staticClass:"q-pa-md"},[o("div",{staticClass:"row q-col-gutter-lg "},[o("div",{staticClass:"col-sm-6 col-lg-6 col-xs-12"},[o("q-card",[o("q-card-section",{staticClass:"row items-center q-pb-none"},[o("div",{staticClass:"text-h6"},[a._v("Add Parking")]),o("q-space")],1),o("q-form",{staticClass:"q-gutter-md q-pa-lg",on:{submit:function(t){return t.preventDefault(),a.onSubmit(t)}}},[o("div",{staticClass:"q-ml-sm row q-col-gutter-md"},[o("div",{staticClass:"col-sm-6 col-xs-12"},[o("q-input",{attrs:{dense:"",color:"secondary",label:"Name",rules:[function(a){return a&&a.length>0||"Please type something"}]},model:{value:a.formData.location,callback:function(t){a.$set(a.formData,"location",t)},expression:"formData.location"}})],1),o("div",{staticClass:"col-sm-6 col-xs-12"},[o("q-input",{attrs:{dense:"",color:"secondary",label:"Postal",rules:[function(a){return a&&6==a.length||"Length should be six"}]},model:{value:a.formData.postal,callback:function(t){a.$set(a.formData,"postal",t)},expression:"formData.postal"}})],1)]),o("div",{staticClass:"q-ml-sm row q-col-gutter-md"},[o("div",{staticClass:"col-sm-6 col-xs-12"},[o("q-input",{attrs:{dense:"",color:"secondary",label:"Latitude",rules:[function(a){return a&&a>0||"Please type something"}]},model:{value:a.formData.lat,callback:function(t){a.$set(a.formData,"lat",t)},expression:"formData.lat"}})],1),o("div",{staticClass:"col-sm-6 col-xs-12"},[o("q-input",{attrs:{dense:"",color:"secondary",label:"Longitude",rules:[function(a){return a&&a>0||"Please type something"}]},model:{value:a.formData.lng,callback:function(t){a.$set(a.formData,"lng",t)},expression:"formData.lng"}})],1)]),o("q-input",{attrs:{dense:"",type:"number",color:"secondary",label:"Available space",rules:[function(a){return a&&a>0||"Please type something"}]},model:{value:a.formData.available_space,callback:function(t){a.$set(a.formData,"available_space",t)},expression:"formData.available_space"}}),o("q-select",{attrs:{options:a.options,label:"Available time",required:"",rules:[function(a){return a&&a.length>0||"Please type something"}]},model:{value:a.formData.available_time,callback:function(t){a.$set(a.formData,"available_time",t)},expression:"formData.available_time"}}),o("div",[o("q-btn",{staticClass:"full-width",attrs:{loading:a.loading,label:"Add",type:"submit",color:"secondary"}})],1)],1)],1)],1),o("div",{staticClass:"col-6 col-sm-6 col-lg-6 col-xs-12"},[o("q-card",[o("q-card-section",[o("small",[a._v("Click on the map to set a marker. (Location tracked\n            automatically.)")])]),o("gmap-map",{ref:"mapRef",staticStyle:{width:"100%",height:"50vmin"},attrs:{center:a.center,zoom:16,"map-style-id":"roadmap"},on:{click:a.handleMapClick}},[o("gmap-marker",{attrs:{position:a.marker.position,clickable:!0,draggable:!0},on:{drag:a.handleMarkerDrag,click:a.panToMarker}})],1)],1)],1)])])},s=[],l=o("755e"),n={name:"GoogleMap",computed:{google:l["gmapApi"]},data(){return{marker:{position:{lat:10,lng:10}},center:{lat:10,lng:10},mapOptions:{disableDefaultUI:!0},formData:{location:"",lat:"null",lng:"null",postal:"",available_space:6,available_time:null},loading:!1,options:["Morning","Morning-Afternoon","Afternoon","Night"]}},mounted(){this.geolocate()},methods:{onSubmit(){this.loading=!0,this.$axios.defaults.withCredentials=!0,console.log("submitted"),this.$axios,this.$axios.post("storeparking",this.formData).then((a=>{this.loading=!1,console.log(a.data),this.$q.notify({message:"Added Successful",color:"green",position:"top",icon:"thumb_up"}),this.$router.push("/parking-zones")})).catch((a=>{this.loading=!1,console.log(a.message),this.$q.notify({message:a.message,color:"red-4",position:"top",icon:"warning"})}))},geolocate(){navigator.geolocation.getCurrentPosition((a=>{this.marker.position={lat:a.coords.latitude,lng:a.coords.longitude},this.getCityAndCountry(),this.panToMarker()}),(()=>{this.$q.notify({message:"Location access denied. Enable location to add slot",color:"red-4",position:"top",icon:"warning"})}))},async getCityAndCountry(){this.formData.lat=this.marker.position.lat,this.formData.lng=this.marker.position.lng;let a=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.marker.position.lat},${this.marker.position.lng}&key=AIzaSyDDXkzEIj9sB3J_ohqT0woVWqAJQiyRmAE`;this.$axios.defaults.withCredentials=!1,await this.$axios.get(a).then((a=>{console.log("results",a.data.results[0].address_components),this.formData.location=a.data.results[0].address_components[1].long_name+", "+a.data.results[0].address_components[2].short_name,this.formData.postal=a.data.results[0].address_components[6].long_name})).catch((a=>{console.log(a)}))},handleMarkerDrag(a){this.marker.position={lat:a.latLng.lat(),lng:a.latLng.lng()}},panToMarker(){this.$refs.mapRef.panTo(this.marker.position)},handleMapClick(a){this.marker.position={lat:a.latLng.lat(),lng:a.latLng.lng()},this.getCityAndCountry()}}},i=n,r=o("2877"),c=o("f09f"),m=o("a370"),d=o("2c91"),p=o("0378"),u=o("27f9"),g=o("ddd8"),h=o("9c40"),f=o("eebe"),b=o.n(f),k=Object(r["a"])(i,e,s,!1,null,null,null);t["default"]=k.exports;b()(k,"components",{QCard:c["a"],QCardSection:m["a"],QSpace:d["a"],QForm:p["a"],QInput:u["a"],QSelect:g["a"],QBtn:h["a"]})}}]);