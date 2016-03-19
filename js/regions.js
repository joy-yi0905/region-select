// 原始数据格式
function regionsSelect() {
    var regionProvice = $(".regions-select .region-provice"),
        regionCity = $(".regions-select .region-city"),
        regionCounty = $(".regions-select .region-county");

    var tempRegionProviceStr = "<option value='-1'>省份</option>",
        tempRegionCityStr = "",
        tempRegionCountyStr = "",
        pIndex = 0,
        cIndex = 0;

    console.log(regions);

    // 省
    $.each(regions , function(index , item){
        tempRegionProviceStr += "<option class='option'>" + item.des + "</option>";
    })
    regionProvice.html( tempRegionProviceStr );

    // 省选择
    regionProvice.bind( "change" , function(){
        pIndex = $(this).prop("selectedIndex") - 1;

        tempRegionCityStr = "<option value='-1'>城市</option>";

        $.each(regions[pIndex].son , function(index , item){
            tempRegionCityStr += "<option class='option'>" + item.des + "</option>";
        })

        regionCity.html( tempRegionCityStr );
        regionCounty.html( "<option value='-1'>地区</option>" );
    })

    // 市选择
    regionCity.bind( "change" , function(){
        cIndex = $(this).prop("selectedIndex") - 1;

        tempRegionCountyStr = "<option value='-1'>地区</option>";

        $.each(regions[pIndex].son[cIndex].son , function(index , item){
            tempRegionCountyStr += "<option class='option'>" + item.des + "</option>";
        })

        regionCounty.html( tempRegionCountyStr );
    })

    $(".regions-select .show-region").bind( "click" , function(){
        alert ( regionProvice.val() + " " + regionCity.val() + " " + regionCounty.val() );
    })
}

regionsSelect();

// 转换省市区数据格式

function newRegionsSelect() {
    var newRegions = {};

    $.each(regions, function(key, val){
        var tempProvice = val.des,
            tempCity = val.son ; // son-数组-省归属的市，val.son.des 为具体市名

        newRegions[tempProvice] = {};

        $.each(tempCity, function(key, val){
            var tempCounty = val.son, // son-数组-市归属的区，val.son.des 为具体区名
                tempCountyArr = [];

            newRegions[tempProvice][val.des] = [];

            $.each(tempCounty, function(key, val){
                tempCountyArr.push(val.des);
            })

            newRegions[tempProvice][val.des] = tempCountyArr;
        })

    })

    console.log(newRegions);

    var regionProvice = $(".new-regions-select .region-provice"),
        regionCity = $(".new-regions-select .region-city"),
        regionCounty = $(".new-regions-select .region-county");

    var tempRegionProviceStr = "<option value='-1'>省份</option>",
        tempRegionCityStr = "",
        tempRegionCountyStr = "";

    // 省
    $.each(newRegions , function(index , item){
        tempRegionProviceStr += "<option class='option'>" + index + "</option>";
    })
    regionProvice.html( tempRegionProviceStr );

    // 省选择
    regionProvice.bind("change", function(){

        tempRegionCityStr = "<option value='-1'>城市</option>";

        $.each(newRegions[regionProvice.val()] , function(index , item){
            tempRegionCityStr += "<option class='option'>" + index + "</option>";
        })

        regionCity.html( tempRegionCityStr );
        regionCounty.html( "<option value='-1'>地区</option>" );

    })

    // 市选择
    regionCity.bind("change", function(){

        tempRegionCountyStr = "<option value='-1'>地区</option>";

        $.each(newRegions[regionProvice.val()][regionCity.val()] , function(index , item){
            tempRegionCountyStr += "<option class='option'>" + item + "</option>";
        })

        regionCounty.html( tempRegionCountyStr );
    })

    $(".new-regions-select .show-region").bind( "click" , function(){
        alert ( regionProvice.val() + " " + regionCity.val() + " " + regionCounty.val() );
    })
}

newRegionsSelect();

