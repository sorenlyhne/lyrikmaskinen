/*
asset-builder @ 2020-09-19 12:39:38
*/

/*seg_desktop_include.js*/

/*tabulator.min.js*/
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Tabulator=e()}(this,function(){"use strict";Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),o=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var i=arguments[1],n=0;n<o;){var s=e[n];if(t.call(i,s,n,e))return n;n++}return-1}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),o=e.length>>>0;if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var i=arguments[1],n=0;n<o;){var s=e[n];if(t.call(i,s,n,e))return s;n++}}});var t=function(t){this.table=t,this.blockHozScrollEvent=!1,this.headersElement=this.createHeadersElement(),this.element=this.createHeaderElement(),this.rowManager=null,this.columns=[],this.columnsByIndex=[],this.columnsByField={},this.scrollLeft=0,this.element.insertBefore(this.headersElement,this.element.firstChild)};t.prototype.createHeadersElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-headers"),t},t.prototype.createHeaderElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-header"),this.table.options.headerVisible||t.classList.add("tabulator-header-hidden"),t},t.prototype.initialize=function(){},t.prototype.setRowManager=function(t){this.rowManager=t},t.prototype.getElement=function(){return this.element},t.prototype.getHeadersElement=function(){return this.headersElement},t.prototype.scrollHorizontal=function(t){var e=0,o=this.element.scrollWidth-this.table.element.clientWidth;this.element.scrollLeft=t,t>o?(e=t-o,this.element.style.marginLeft=-e+"px"):this.element.style.marginLeft=0,this.scrollLeft=t,this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.scrollHorizontal()},t.prototype.generateColumnsFromRowData=function(t){var e,o,i=[];if(t&&t.length){e=t[0];for(var n in e){var s={field:n,title:n},r=e[n];switch(void 0===r?"undefined":_typeof(r)){case"undefined":o="string";break;case"boolean":o="boolean";break;case"object":o=Array.isArray(r)?"array":"string";break;default:o=isNaN(r)||""===r?r.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)?"alphanum":"string":"number"}s.sorter=o,i.push(s)}this.table.options.columns=i,this.setColumns(this.table.options.columns)}},t.prototype.setColumns=function(t,e){for(var o=this;o.headersElement.firstChild;)o.headersElement.removeChild(o.headersElement.firstChild);o.columns=[],o.columnsByIndex=[],o.columnsByField={},o.table.modExists("frozenColumns")&&o.table.modules.frozenColumns.reset(),t.forEach(function(t,e){o._addColumn(t)}),o._reIndexColumns(),o.table.options.responsiveLayout&&o.table.modExists("responsiveLayout",!0)&&o.table.modules.responsiveLayout.initialize(),o.redraw(!0)},t.prototype._addColumn=function(t,e,o){var n=new i(t,this),s=n.getElement(),r=o?this.findColumnIndex(o):o;if(o&&r>-1){var a=this.columns.indexOf(o.getTopColumn()),l=o.getElement();e?(this.columns.splice(a,0,n),l.parentNode.insertBefore(s,l)):(this.columns.splice(a+1,0,n),l.parentNode.insertBefore(s,l.nextSibling))}else e?(this.columns.unshift(n),this.headersElement.insertBefore(n.getElement(),this.headersElement.firstChild)):(this.columns.push(n),this.headersElement.appendChild(n.getElement())),n.columnRendered();return n},t.prototype.registerColumnField=function(t){t.definition.field&&(this.columnsByField[t.definition.field]=t)},t.prototype.registerColumnPosition=function(t){this.columnsByIndex.push(t)},t.prototype._reIndexColumns=function(){this.columnsByIndex=[],this.columns.forEach(function(t){t.reRegisterPosition()})},t.prototype._verticalAlignHeaders=function(){var t=this,e=0;t.columns.forEach(function(t){var o;t.clearVerticalAlign(),(o=t.getHeight())>e&&(e=o)}),t.columns.forEach(function(o){o.verticalAlign(t.table.options.columnHeaderVertAlign,e)}),t.rowManager.adjustTableSize()},t.prototype.findColumn=function(t){var e=this;if("object"!=(void 0===t?"undefined":_typeof(t)))return this.columnsByField[t]||!1;if(t instanceof i)return t;if(t instanceof o)return t._getSelf()||!1;if("undefined"!=typeof HTMLElement&&t instanceof HTMLElement){return e.columns.find(function(e){return e.element===t})||!1}return!1},t.prototype.getColumnByField=function(t){return this.columnsByField[t]},t.prototype.getColumnsByFieldRoot=function(t){var e=this,o=[];return Object.keys(this.columnsByField).forEach(function(i){i.split(".")[0]===t&&o.push(e.columnsByField[i])}),o},t.prototype.getColumnByIndex=function(t){return this.columnsByIndex[t]},t.prototype.getFirstVisibileColumn=function(t){var t=this.columnsByIndex.findIndex(function(t){return t.visible});return t>-1&&this.columnsByIndex[t]},t.prototype.getColumns=function(){return this.columns},t.prototype.findColumnIndex=function(t){return this.columnsByIndex.findIndex(function(e){return t===e})},t.prototype.getRealColumns=function(){return this.columnsByIndex},t.prototype.traverse=function(t){this.columnsByIndex.forEach(function(e,o){t(e,o)})},t.prototype.getDefinitions=function(t){var e=this,o=[];return e.columnsByIndex.forEach(function(e){(!t||t&&e.visible)&&o.push(e.getDefinition())}),o},t.prototype.getDefinitionTree=function(){var t=this,e=[];return t.columns.forEach(function(t){e.push(t.getDefinition(!0))}),e},t.prototype.getComponents=function(t){var e=this,o=[];return(t?e.columns:e.columnsByIndex).forEach(function(t){o.push(t.getComponent())}),o},t.prototype.getWidth=function(){var t=0;return this.columnsByIndex.forEach(function(e){e.visible&&(t+=e.getWidth())}),t},t.prototype.moveColumn=function(t,e,o){this.moveColumnActual(t,e,o),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.initialize(),this.table.modExists("columnCalcs")&&this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),e.element.parentNode.insertBefore(t.element,e.element),o&&e.element.parentNode.insertBefore(e.element,t.element),this._verticalAlignHeaders(),this.table.rowManager.reinitialize()},t.prototype.moveColumnActual=function(t,e,o){this._moveColumnInArray(this.columns,t,e,o),this._moveColumnInArray(this.columnsByIndex,t,e,o,!0),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.initialize(),this.table.options.columnMoved&&this.table.options.columnMoved.call(this.table,t.getComponent(),this.table.columnManager.getComponents()),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.columns&&this.table.modules.persistence.save("columns")},t.prototype._moveColumnInArray=function(t,e,o,i,n){var s,r=t.indexOf(e);r>-1&&(t.splice(r,1),s=t.indexOf(o),s>-1?i&&(s+=1):s=r,t.splice(s,0,e),n&&this.table.rowManager.rows.forEach(function(t){if(t.cells.length){var e=t.cells.splice(r,1)[0];t.cells.splice(s,0,e)}}))},t.prototype.scrollToColumn=function(t,e,o){var i=this,n=0,s=0,r=0,a=t.getElement();return new Promise(function(l,c){if(void 0===e&&(e=i.table.options.scrollToColumnPosition),void 0===o&&(o=i.table.options.scrollToColumnIfVisible),t.visible){switch(e){case"middle":case"center":r=-i.element.clientWidth/2;break;case"right":r=a.clientWidth-i.headersElement.clientWidth}if(!o&&(s=a.offsetLeft)>0&&s+a.offsetWidth<i.element.clientWidth)return!1;n=a.offsetLeft+i.element.scrollLeft+r,n=Math.max(Math.min(n,i.table.rowManager.element.scrollWidth-i.table.rowManager.element.clientWidth),0),i.table.rowManager.scrollHorizontal(n),i.scrollHorizontal(n),l()}else console.warn("Scroll Error - Column not visible"),c("Scroll Error - Column not visible")})},t.prototype.generateCells=function(t){var e=this,o=[];return e.columnsByIndex.forEach(function(e){o.push(e.generateCell(t))}),o},t.prototype.getFlexBaseWidth=function(){var t=this,e=t.table.element.clientWidth,o=0;return t.rowManager.element.scrollHeight>t.rowManager.element.clientHeight&&(e-=t.rowManager.element.offsetWidth-t.rowManager.element.clientWidth),this.columnsByIndex.forEach(function(i){var n,s,r;i.visible&&(n=i.definition.width||0,s=void 0===i.minWidth?t.table.options.columnMinWidth:parseInt(i.minWidth),r="string"==typeof n?n.indexOf("%")>-1?e/100*parseInt(n):parseInt(n):n,o+=r>s?r:s)}),o},t.prototype.addColumn=function(t,e,o){var i=this;return new Promise(function(n,s){var r=i._addColumn(t,e,o);i._reIndexColumns(),i.table.options.responsiveLayout&&i.table.modExists("responsiveLayout",!0)&&i.table.modules.responsiveLayout.initialize(),i.table.modExists("columnCalcs")&&i.table.modules.columnCalcs.recalc(i.table.rowManager.activeRows),i.redraw(),"fitColumns"!=i.table.modules.layout.getMode()&&r.reinitializeWidth(),i._verticalAlignHeaders(),i.table.rowManager.reinitialize(),n(r)})},t.prototype.deregisterColumn=function(t){var e,o=t.getField();o&&delete this.columnsByField[o],e=this.columnsByIndex.indexOf(t),e>-1&&this.columnsByIndex.splice(e,1),e=this.columns.indexOf(t),e>-1&&this.columns.splice(e,1),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.initialize(),this.redraw()},t.prototype.redraw=function(t){t&&(u.prototype.helpers.elVisible(this.element)&&this._verticalAlignHeaders(),this.table.rowManager.resetScroll(),this.table.rowManager.reinitialize()),["fitColumns","fitDataStretch"].indexOf(this.table.modules.layout.getMode())>-1?this.table.modules.layout.layout():t?this.table.modules.layout.layout():this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.update(),this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.layout(),this.table.modExists("columnCalcs")&&this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),t&&(this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.columns&&this.table.modules.persistence.save("columns"),this.table.modExists("columnCalcs")&&this.table.modules.columnCalcs.redraw()),this.table.footerManager.redraw()};var o=function(t){this._column=t,this.type="ColumnComponent"};o.prototype.getElement=function(){return this._column.getElement()},o.prototype.getDefinition=function(){return this._column.getDefinition()},o.prototype.getField=function(){return this._column.getField()},o.prototype.getCells=function(){var t=[];return this._column.cells.forEach(function(e){t.push(e.getComponent())}),t},o.prototype.getVisibility=function(){return this._column.visible},o.prototype.show=function(){this._column.isGroup?this._column.columns.forEach(function(t){t.show()}):this._column.show()},o.prototype.hide=function(){this._column.isGroup?this._column.columns.forEach(function(t){t.hide()}):this._column.hide()},o.prototype.toggle=function(){this._column.visible?this.hide():this.show()},o.prototype.delete=function(){return this._column.delete()},o.prototype.getSubColumns=function(){var t=[];return this._column.columns.length&&this._column.columns.forEach(function(e){t.push(e.getComponent())}),t},o.prototype.getParentColumn=function(){return this._column.parent instanceof i&&this._column.parent.getComponent()},o.prototype._getSelf=function(){return this._column},o.prototype.scrollTo=function(){return this._column.table.columnManager.scrollToColumn(this._column)},o.prototype.getTable=function(){return this._column.table},o.prototype.headerFilterFocus=function(){this._column.table.modExists("filter",!0)&&this._column.table.modules.filter.setHeaderFilterFocus(this._column)},o.prototype.reloadHeaderFilter=function(){this._column.table.modExists("filter",!0)&&this._column.table.modules.filter.reloadHeaderFilter(this._column)},o.prototype.setHeaderFilterValue=function(t){this._column.table.modExists("filter",!0)&&this._column.table.modules.filter.setHeaderFilterValue(this._column,t)},o.prototype.move=function(t,e){var o=this._column.table.columnManager.findColumn(t);o?this._column.table.columnManager.moveColumn(this._column,o,e):console.warn("Move Error - No matching column found:",o)},o.prototype.getNextColumn=function(){var t=this._column.nextColumn();return!!t&&t.getComponent()},o.prototype.getPrevColumn=function(){var t=this._column.prevColumn();return!!t&&t.getComponent()},o.prototype.updateDefinition=function(t){return this._column.updateDefinition(t)};var i=function t(e,o){var i=this;this.table=o.table,this.definition=e,this.parent=o,this.type="column",this.columns=[],this.cells=[],this.element=this.createElement(),this.contentElement=!1,this.groupElement=this.createGroupElement(),this.isGroup=!1,this.tooltip=!1,this.hozAlign="",this.field="",this.fieldStructure="",this.getFieldValue="",this.setFieldValue="",this.titleFormatterRendered=!1,this.setField(this.definition.field),this.table.options.invalidOptionWarnings&&this.checkDefinition(),this.modules={},this.cellEvents={cellClick:!1,cellDblClick:!1,cellContext:!1,cellTap:!1,cellDblTap:!1,cellTapHold:!1,cellMouseEnter:!1,cellMouseLeave:!1,cellMouseOver:!1,cellMouseOut:!1,cellMouseMove:!1},this.width=null,this.widthStyled="",this.minWidth=null,this.minWidthStyled="",this.widthFixed=!1,this.visible=!0,this._mapDepricatedFunctionality(),e.columns?(this.isGroup=!0,e.columns.forEach(function(e,o){var n=new t(e,i);i.attachColumn(n)}),i.checkColumnVisibility()):o.registerColumnField(this),e.rowHandle&&!1!==this.table.options.movableRows&&this.table.modExists("moveRow")&&this.table.modules.moveRow.setHandle(!0),this._buildHeader(),this.bindModuleColumns()};i.prototype.createElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-col"),t.setAttribute("role","columnheader"),t.setAttribute("aria-sort","none"),t},i.prototype.createGroupElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-col-group-cols"),t},i.prototype.checkDefinition=function(){var t=this;Object.keys(this.definition).forEach(function(e){-1===t.defaultOptionList.indexOf(e)&&console.warn("Invalid column definition option in '"+(t.field||t.definition.title)+"' column:",e)})},i.prototype.setField=function(t){this.field=t,this.fieldStructure=t?this.table.options.nestedFieldSeparator?t.split(this.table.options.nestedFieldSeparator):[t]:[],this.getFieldValue=this.fieldStructure.length>1?this._getNestedData:this._getFlatData,this.setFieldValue=this.fieldStructure.length>1?this._setNesteData:this._setFlatData},i.prototype.registerColumnPosition=function(t){this.parent.registerColumnPosition(t)},i.prototype.registerColumnField=function(t){this.parent.registerColumnField(t)},i.prototype.reRegisterPosition=function(){this.isGroup?this.columns.forEach(function(t){t.reRegisterPosition()}):this.registerColumnPosition(this)},i.prototype._mapDepricatedFunctionality=function(){void 0!==this.definition.hideInHtml&&(this.definition.htmlOutput=!this.definition.hideInHtml,console.warn("hideInHtml column definition property is deprecated, you should now use htmlOutput"))},i.prototype.setTooltip=function(){var t=this,e=t.definition,o=e.headerTooltip||!1===e.tooltip?e.headerTooltip:t.table.options.tooltipsHeader;o?!0===o?e.field?t.table.modules.localize.bind("columns|"+e.field,function(o){t.element.setAttribute("title",o||e.title)}):t.element.setAttribute("title",e.title):("function"==typeof o&&!1===(o=o(t.getComponent()))&&(o=""),t.element.setAttribute("title",o)):t.element.setAttribute("title","")},i.prototype._buildHeader=function(){for(var t=this,e=t.definition;t.element.firstChild;)t.element.removeChild(t.element.firstChild);e.headerVertical&&(t.element.classList.add("tabulator-col-vertical"),"flip"===e.headerVertical&&t.element.classList.add("tabulator-col-vertical-flip")),t.contentElement=t._bindEvents(),t.contentElement=t._buildColumnHeaderContent(),t.element.appendChild(t.contentElement),t.isGroup?t._buildGroupHeader():t._buildColumnHeader(),t.setTooltip(),t.table.options.resizableColumns&&t.table.modExists("resizeColumns")&&t.table.modules.resizeColumns.initializeColumn("header",t,t.element),e.headerFilter&&t.table.modExists("filter")&&t.table.modExists("edit")&&(void 0!==e.headerFilterPlaceholder&&e.field&&t.table.modules.localize.setHeaderFilterColumnPlaceholder(e.field,e.headerFilterPlaceholder),t.table.modules.filter.initializeColumn(t)),t.table.modExists("frozenColumns")&&t.table.modules.frozenColumns.initializeColumn(t),t.table.options.movableColumns&&!t.isGroup&&t.table.modExists("moveColumn")&&t.table.modules.moveColumn.initializeColumn(t),(e.topCalc||e.bottomCalc)&&t.table.modExists("columnCalcs")&&t.table.modules.columnCalcs.initializeColumn(t),t.table.modExists("persistence")&&t.table.modules.persistence.config.columns&&t.table.modules.persistence.initializeColumn(t),t.element.addEventListener("mouseenter",function(e){t.setTooltip()})},i.prototype._bindEvents=function(){var t,e,o,i=this,n=i.definition;"function"==typeof n.headerClick&&i.element.addEventListener("click",function(t){n.headerClick(t,i.getComponent())}),"function"==typeof n.headerDblClick&&i.element.addEventListener("dblclick",function(t){n.headerDblClick(t,i.getComponent())}),"function"==typeof n.headerContext&&i.element.addEventListener("contextmenu",function(t){n.headerContext(t,i.getComponent())}),"function"==typeof n.headerTap&&(o=!1,i.element.addEventListener("touchstart",function(t){o=!0},{passive:!0}),i.element.addEventListener("touchend",function(t){o&&n.headerTap(t,i.getComponent()),o=!1})),"function"==typeof n.headerDblTap&&(t=null,i.element.addEventListener("touchend",function(e){t?(clearTimeout(t),t=null,n.headerDblTap(e,i.getComponent())):t=setTimeout(function(){clearTimeout(t),t=null},300)})),"function"==typeof n.headerTapHold&&(e=null,i.element.addEventListener("touchstart",function(t){clearTimeout(e),e=setTimeout(function(){clearTimeout(e),e=null,o=!1,n.headerTapHold(t,i.getComponent())},1e3)},{passive:!0}),i.element.addEventListener("touchend",function(t){clearTimeout(e),e=null})),"function"==typeof n.cellClick&&(i.cellEvents.cellClick=n.cellClick),"function"==typeof n.cellDblClick&&(i.cellEvents.cellDblClick=n.cellDblClick),"function"==typeof n.cellContext&&(i.cellEvents.cellContext=n.cellContext),"function"==typeof n.cellMouseEnter&&(i.cellEvents.cellMouseEnter=n.cellMouseEnter),"function"==typeof n.cellMouseLeave&&(i.cellEvents.cellMouseLeave=n.cellMouseLeave),"function"==typeof n.cellMouseOver&&(i.cellEvents.cellMouseOver=n.cellMouseOver),"function"==typeof n.cellMouseOut&&(i.cellEvents.cellMouseOut=n.cellMouseOut),"function"==typeof n.cellMouseMove&&(i.cellEvents.cellMouseMove=n.cellMouseMove),"function"==typeof n.cellTap&&(i.cellEvents.cellTap=n.cellTap),"function"==typeof n.cellDblTap&&(i.cellEvents.cellDblTap=n.cellDblTap),"function"==typeof n.cellTapHold&&(i.cellEvents.cellTapHold=n.cellTapHold),"function"==typeof n.cellEdited&&(i.cellEvents.cellEdited=n.cellEdited),"function"==typeof n.cellEditing&&(i.cellEvents.cellEditing=n.cellEditing),"function"==typeof n.cellEditCancelled&&(i.cellEvents.cellEditCancelled=n.cellEditCancelled)},i.prototype._buildColumnHeader=function(){var t=this,e=t.definition,o=t.table;if(o.modExists("sort")&&o.modules.sort.initializeColumn(t,t.contentElement),o.modExists("format")&&o.modules.format.initializeColumn(t),void 0!==e.editor&&o.modExists("edit")&&o.modules.edit.initializeColumn(t),void 0!==e.validator&&o.modExists("validate")&&o.modules.validate.initializeColumn(t),o.modExists("mutator")&&o.modules.mutator.initializeColumn(t),o.modExists("accessor")&&o.modules.accessor.initializeColumn(t),_typeof(o.options.responsiveLayout)&&o.modExists("responsiveLayout")&&o.modules.responsiveLayout.initializeColumn(t),void 0!==e.visible&&(e.visible?t.show(!0):t.hide(!0)),e.cssClass){e.cssClass.split(" ").forEach(function(e){t.element.classList.add(e)})}e.field&&this.element.setAttribute("tabulator-field",e.field),t.setMinWidth(void 0===e.minWidth?t.table.options.columnMinWidth:parseInt(e.minWidth)),t.reinitializeWidth(),t.tooltip=t.definition.tooltip||!1===t.definition.tooltip?t.definition.tooltip:t.table.options.tooltips,t.hozAlign=void 0===t.definition.align?"":t.definition.align},i.prototype._buildColumnHeaderContent=function(){var t=this,e=(t.definition,t.table,document.createElement("div"));return e.classList.add("tabulator-col-content"),e.appendChild(t._buildColumnHeaderTitle()),e},i.prototype._buildColumnHeaderTitle=function(){var t=this,e=t.definition,o=t.table,i=document.createElement("div");if(i.classList.add("tabulator-col-title"),e.editableTitle){var n=document.createElement("input");n.classList.add("tabulator-title-editor"),n.addEventListener("click",function(t){t.stopPropagation(),n.focus()}),n.addEventListener("change",function(){e.title=n.value,o.options.columnTitleChanged.call(t.table,t.getComponent())}),i.appendChild(n),e.field?o.modules.localize.bind("columns|"+e.field,function(t){n.value=t||e.title||"&nbsp;"}):n.value=e.title||"&nbsp;"}else e.field?o.modules.localize.bind("columns|"+e.field,function(o){t._formatColumnHeaderTitle(i,o||e.title||"&nbsp;")}):t._formatColumnHeaderTitle(i,e.title||"&nbsp;");return i},i.prototype._formatColumnHeaderTitle=function(t,e){var o,i,n,s,r,a=this;if(this.definition.titleFormatter&&this.table.modExists("format"))switch(o=this.table.modules.format.getFormatter(this.definition.titleFormatter),r=function(t){a.titleFormatterRendered=t},s={getValue:function(){return e},getElement:function(){return t}},n=this.definition.titleFormatterParams||{},n="function"==typeof n?n():n,i=o.call(this.table.modules.format,s,n,r),void 0===i?"undefined":_typeof(i)){case"object":i instanceof Node?t.appendChild(i):(t.innerHTML="",console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:",i));break;case"undefined":case"null":t.innerHTML="";break;default:t.innerHTML=i}else t.innerHTML=e},i.prototype._buildGroupHeader=function(){var t=this;if(this.element.classList.add("tabulator-col-group"),this.element.setAttribute("role","columngroup"),this.element.setAttribute("aria-title",this.definition.title),this.definition.cssClass){this.definition.cssClass.split(" ").forEach(function(e){t.element.classList.add(e)})}this.element.appendChild(this.groupElement)},i.prototype._getFlatData=function(t){return t[this.field]},i.prototype._getNestedData=function(t){for(var e,o=t,i=this.fieldStructure,n=i.length,s=0;s<n&&(o=o[i[s]],e=o,o);s++);return e},i.prototype._setFlatData=function(t,e){this.field&&(t[this.field]=e)},i.prototype._setNesteData=function(t,e){for(var o=t,i=this.fieldStructure,n=i.length,s=0;s<n;s++)s==n-1?o[i[s]]=e:(o[i[s]]||(o[i[s]]={}),o=o[i[s]])},i.prototype.attachColumn=function(t){var e=this;e.groupElement?(e.columns.push(t),e.groupElement.appendChild(t.getElement())):console.warn("Column Warning - Column being attached to another column instead of column group")},i.prototype.verticalAlign=function(t,e){var o=this.parent.isGroup?this.parent.getGroupElement().clientHeight:e||this.parent.getHeadersElement().clientHeight;this.element.style.height=o+"px",this.isGroup&&(this.groupElement.style.minHeight=o-this.contentElement.offsetHeight+"px"),this.isGroup||"top"===t||(this.element.style.paddingTop="bottom"===t?this.element.clientHeight-this.contentElement.offsetHeight+"px":(this.element.clientHeight-this.contentElement.offsetHeight)/2+"px"),this.columns.forEach(function(e){e.verticalAlign(t)})},i.prototype.clearVerticalAlign=function(){this.element.style.paddingTop="",this.element.style.height="",this.element.style.minHeight="",this.groupElement.style.minHeight="",this.columns.forEach(function(t){t.clearVerticalAlign()})},i.prototype.bindModuleColumns=function(){"rownum"==this.definition.formatter&&(this.table.rowManager.rowNumColumn=this)},i.prototype.getElement=function(){return this.element},i.prototype.getGroupElement=function(){return this.groupElement},i.prototype.getField=function(){return this.field},i.prototype.getFirstColumn=function(){return this.isGroup?!!this.columns.length&&this.columns[0].getFirstColumn():this},i.prototype.getLastColumn=function(){return this.isGroup?!!this.columns.length&&this.columns[this.columns.length-1].getLastColumn():this},i.prototype.getColumns=function(){return this.columns},i.prototype.getCells=function(){return this.cells},i.prototype.getTopColumn=function(){return this.parent.isGroup?this.parent.getTopColumn():this},i.prototype.getDefinition=function(t){var e=[];return this.isGroup&&t&&(this.columns.forEach(function(t){e.push(t.getDefinition(!0))}),this.definition.columns=e),this.definition},i.prototype.checkColumnVisibility=function(){var t=!1;this.columns.forEach(function(e){e.visible&&(t=!0)}),t?(this.show(),this.parent.table.options.columnVisibilityChanged.call(this.table,this.getComponent(),!1)):this.hide()},i.prototype.show=function(t,e){this.visible||(this.visible=!0,this.element.style.display="",this.parent.isGroup&&this.parent.checkColumnVisibility(),this.cells.forEach(function(t){t.show()}),this.isGroup||null!==this.width||this.reinitializeWidth(),this.table.columnManager._verticalAlignHeaders(),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.columns&&this.table.modules.persistence.save("columns"),!e&&this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.updateColumnVisibility(this,this.visible),t||this.table.options.columnVisibilityChanged.call(this.table,this.getComponent(),!0),this.parent.isGroup&&this.parent.matchChildWidths())},i.prototype.hide=function(t,e){this.visible&&(this.visible=!1,this.element.style.display="none",this.table.columnManager._verticalAlignHeaders(),this.parent.isGroup&&this.parent.checkColumnVisibility(),this.cells.forEach(function(t){t.hide()}),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.columns&&this.table.modules.persistence.save("columns"),!e&&this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.updateColumnVisibility(this,this.visible),t||this.table.options.columnVisibilityChanged.call(this.table,this.getComponent(),!1),this.parent.isGroup&&this.parent.matchChildWidths())},i.prototype.matchChildWidths=function(){var t=0;this.contentElement&&this.columns.length&&(this.columns.forEach(function(e){e.visible&&(t+=e.getWidth())}),this.contentElement.style.maxWidth=t-1+"px")},i.prototype.setWidth=function(t){this.widthFixed=!0,this.setWidthActual(t)},i.prototype.setWidthActual=function(t){isNaN(t)&&(t=Math.floor(this.table.element.clientWidth/100*parseInt(t))),t=Math.max(this.minWidth,t),this.width=t,this.widthStyled=t?t+"px":"",this.element.style.width=this.widthStyled,this.isGroup||this.cells.forEach(function(t){t.setWidth()}),this.parent.isGroup&&this.parent.matchChildWidths(),this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.layout()},i.prototype.checkCellHeights=function(){var t=[];this.cells.forEach(function(e){e.row.heightInitialized&&(null!==e.row.getElement().offsetParent?(t.push(e.row),e.row.clearCellHeight()):e.row.heightInitialized=!1)}),t.forEach(function(t){t.calcHeight()}),t.forEach(function(t){t.setCellHeight()})},i.prototype.getWidth=function(){return this.width},i.prototype.getHeight=function(){return this.element.offsetHeight},i.prototype.setMinWidth=function(t){this.minWidth=t,this.minWidthStyled=t?t+"px":"",this.element.style.minWidth=this.minWidthStyled,this.cells.forEach(function(t){t.setMinWidth()})},i.prototype.delete=function(){var t=this;return new Promise(function(e,o){t.isGroup&&t.columns.forEach(function(t){t.delete()});for(var i=t.cells.length,n=0;n<i;n++)t.cells[0].delete();t.element.parentNode.removeChild(t.element),t.table.columnManager.deregisterColumn(t),e()})},i.prototype.columnRendered=function(){this.titleFormatterRendered&&this.titleFormatterRendered()},i.prototype.generateCell=function(t){var e=this,o=new l(e,t);return this.cells.push(o),o},i.prototype.nextColumn=function(){var t=this.table.columnManager.findColumnIndex(this);return t>-1&&this._nextVisibleColumn(t+1)},i.prototype._nextVisibleColumn=function(t){var e=this.table.columnManager.getColumnByIndex(t);return!e||e.visible?e:this._nextVisibleColumn(t+1)},i.prototype.prevColumn=function(){var t=this.table.columnManager.findColumnIndex(this);return t>-1&&this._prevVisibleColumn(t-1)},i.prototype._prevVisibleColumn=function(t){var e=this.table.columnManager.getColumnByIndex(t);return!e||e.visible?e:this._prevVisibleColumn(t-1)},i.prototype.reinitializeWidth=function(t){this.widthFixed=!1,void 0===this.definition.width||t||this.setWidth(this.definition.width),this.table.modExists("filter")&&this.table.modules.filter.hideHeaderFilterElements(),this.fitToData(),this.table.modExists("filter")&&this.table.modules.filter.showHeaderFilterElements()},i.prototype.fitToData=function(){var t=this;this.widthFixed||(this.element.style.width="",t.cells.forEach(function(t){t.clearWidth()}));var e=this.element.offsetWidth;t.width&&this.widthFixed||(t.cells.forEach(function(t){var o=t.getWidth();o>e&&(e=o)}),e&&t.setWidthActual(e+1))},i.prototype.updateDefinition=function(t){var e=this;return new Promise(function(o,i){var n;e.isGroup?(console.warn("Column Update Error - The updateDefintion function is only available on columns, not column groups"),i("Column Update Error - The updateDefintion function is only available on columns, not column groups")):(n=Object.assign({},e.getDefinition()),n=Object.assign(n,t),e.table.columnManager.addColumn(n,!1,e).then(function(t){n.field==e.field&&(e.field=!1),e.delete().then(function(){o(t.getComponent())}).catch(function(t){i(t)})}).catch(function(t){i(t)}))})},i.prototype.deleteCell=function(t){var e=this.cells.indexOf(t);e>-1&&this.cells.splice(e,1)},i.prototype.defaultOptionList=["title","field","columns","visible","align","width","minWidth","widthGrow","widthShrink","resizable","frozen","responsive","tooltip","cssClass","rowHandle","hideInHtml","print","htmlOutput","sorter","sorterParams","formatter","formatterParams","variableHeight","editable","editor","editorParams","validator","mutator","mutatorParams","mutatorData","mutatorDataParams","mutatorEdit","mutatorEditParams","mutatorClipboard","mutatorClipboardParams","accessor","accessorParams","accessorData","accessorDataParams","accessorDownload","accessorDownloadParams","accessorClipboard","accessorClipboardParams","clipboard","download","downloadTitle","topCalc","topCalcParams","topCalcFormatter","topCalcFormatterParams","bottomCalc","bottomCalcParams","bottomCalcFormatter","bottomCalcFormatterParams","cellClick","cellDblClick","cellContext","cellTap","cellDblTap","cellTapHold","cellMouseEnter","cellMouseLeave","cellMouseOver","cellMouseOut","cellMouseMove","cellEditing","cellEdited","cellEditCancelled","headerSort","headerSortStartingDir","headerSortTristate","headerClick","headerDblClick","headerContext","headerTap","headerDblTap","headerTapHold","headerTooltip","headerVertical","editableTitle","titleFormatter","titleFormatterParams","headerFilter","headerFilterPlaceholder","headerFilterParams","headerFilterEmptyCheck","headerFilterFunc","headerFilterFuncParams","headerFilterLiveFilter","print"],i.prototype.getComponent=function(){return new o(this)};var n=function(t){this.table=t,this.element=this.createHolderElement(),this.tableElement=this.createTableElement(),this.columnManager=null,this.height=0,this.firstRender=!1,
this.renderMode="classic",this.rows=[],this.activeRows=[],this.activeRowsCount=0,this.displayRows=[],this.displayRowsCount=0,this.scrollTop=0,this.scrollLeft=0,this.vDomRowHeight=20,this.vDomTop=0,this.vDomBottom=0,this.vDomScrollPosTop=0,this.vDomScrollPosBottom=0,this.vDomTopPad=0,this.vDomBottomPad=0,this.vDomMaxRenderChain=90,this.vDomWindowBuffer=0,this.vDomWindowMinTotalRows=20,this.vDomWindowMinMarginRows=5,this.vDomTopNewRows=[],this.vDomBottomNewRows=[],this.rowNumColumn=!1,this.redrawBlock=!1,this.redrawBlockRestoreConfig=!1,this.redrawBlockRederInPosition=!1};n.prototype.createHolderElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-tableHolder"),t.setAttribute("tabindex",0),t},n.prototype.createTableElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-table"),t},n.prototype.getElement=function(){return this.element},n.prototype.getTableElement=function(){return this.tableElement},n.prototype.getRowPosition=function(t,e){return e?this.activeRows.indexOf(t):this.rows.indexOf(t)},n.prototype.setColumnManager=function(t){this.columnManager=t},n.prototype.initialize=function(){var t=this;t.setRenderMode(),t.element.appendChild(t.tableElement),t.firstRender=!0,t.element.addEventListener("scroll",function(){var e=t.element.scrollLeft;t.scrollLeft!=e&&(t.columnManager.scrollHorizontal(e),t.table.options.groupBy&&t.table.modules.groupRows.scrollHeaders(e),t.table.modExists("columnCalcs")&&t.table.modules.columnCalcs.scrollHorizontal(e),t.table.options.scrollHorizontal(e)),t.scrollLeft=e}),"virtual"===this.renderMode&&t.element.addEventListener("scroll",function(){var e=t.element.scrollTop,o=t.scrollTop>e;t.scrollTop!=e?(t.scrollTop=e,t.scrollVertical(o),"scroll"==t.table.options.ajaxProgressiveLoad&&t.table.modules.ajax.nextPage(t.element.scrollHeight-t.element.clientHeight-e),t.table.options.scrollVertical(e)):t.scrollTop=e})},n.prototype.findRow=function(t){var e=this;if("object"!=(void 0===t?"undefined":_typeof(t))){if(void 0===t||null===t)return!1;return e.rows.find(function(o){return o.data[e.table.options.index]==t})||!1}if(t instanceof r)return t;if(t instanceof s)return t._getSelf()||!1;if("undefined"!=typeof HTMLElement&&t instanceof HTMLElement){return e.rows.find(function(e){return e.element===t})||!1}return!1},n.prototype.getRowFromDataObject=function(t){return this.rows.find(function(e){return e.data===t})||!1},n.prototype.getRowFromPosition=function(t,e){return e?this.activeRows[t]:this.rows[t]},n.prototype.scrollToRow=function(t,e,o){var i,n=this,s=this.getDisplayRows().indexOf(t),r=t.getElement(),a=0;return new Promise(function(t,l){if(s>-1){if(void 0===e&&(e=n.table.options.scrollToRowPosition),void 0===o&&(o=n.table.options.scrollToRowIfVisible),"nearest"===e)switch(n.renderMode){case"classic":i=u.prototype.helpers.elOffset(r).top,e=Math.abs(n.element.scrollTop-i)>Math.abs(n.element.scrollTop+n.element.clientHeight-i)?"bottom":"top";break;case"virtual":e=Math.abs(n.vDomTop-s)>Math.abs(n.vDomBottom-s)?"bottom":"top"}if(!o&&u.prototype.helpers.elVisible(r)&&(a=u.prototype.helpers.elOffset(r).top-u.prototype.helpers.elOffset(n.element).top)>0&&a<n.element.clientHeight-r.offsetHeight)return!1;switch(n.renderMode){case"classic":n.element.scrollTop=u.prototype.helpers.elOffset(r).top-u.prototype.helpers.elOffset(n.element).top+n.element.scrollTop;break;case"virtual":n._virtualRenderFill(s,!0)}switch(e){case"middle":case"center":n.element.scrollHeight-n.element.scrollTop==n.element.clientHeight?n.element.scrollTop=n.element.scrollTop+(r.offsetTop-n.element.scrollTop)-(n.element.scrollHeight-r.offsetTop)/2:n.element.scrollTop=n.element.scrollTop-n.element.clientHeight/2;break;case"bottom":n.element.scrollHeight-n.element.scrollTop==n.element.clientHeight?n.element.scrollTop=n.element.scrollTop-(n.element.scrollHeight-r.offsetTop)+r.offsetHeight:n.element.scrollTop=n.element.scrollTop-n.element.clientHeight+r.offsetHeight}t()}else console.warn("Scroll Error - Row not visible"),l("Scroll Error - Row not visible")})},n.prototype.setData=function(t,e){var o=this,i=this;return new Promise(function(n,s){e&&o.getDisplayRows().length?i.table.options.pagination?i._setDataActual(t,!0):o.reRenderInPosition(function(){i._setDataActual(t)}):(o.table.options.autoColumns&&o.table.columnManager.generateColumnsFromRowData(t),o.resetScroll(),o._setDataActual(t)),n()})},n.prototype._setDataActual=function(t,e){var o=this;o.table.options.dataLoading.call(this.table,t),this._wipeElements(),this.table.options.history&&this.table.modExists("history")&&this.table.modules.history.clear(),Array.isArray(t)?(this.table.modExists("selectRow")&&this.table.modules.selectRow.clearSelectionData(),this.table.options.reactiveData&&this.table.modExists("reactiveData",!0)&&this.table.modules.reactiveData.watchData(t),t.forEach(function(t,e){if(t&&"object"===(void 0===t?"undefined":_typeof(t))){var i=new r(t,o);o.rows.push(i)}else console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:",t)}),o.table.options.dataLoaded.call(this.table,t),o.refreshActiveData(!1,!1,e)):console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ",void 0===t?"undefined":_typeof(t),"\nData:     ",t)},n.prototype._wipeElements=function(){this.rows.forEach(function(t){t.wipe()}),this.table.options.groupBy&&this.table.modExists("groupRows")&&this.table.modules.groupRows.wipe(),this.rows=[]},n.prototype.deleteRow=function(t,e){var o=this.rows.indexOf(t),i=this.activeRows.indexOf(t);i>-1&&this.activeRows.splice(i,1),o>-1&&this.rows.splice(o,1),this.setActiveRows(this.activeRows),this.displayRowIterator(function(e){var o=e.indexOf(t);o>-1&&e.splice(o,1)}),e||this.reRenderInPosition(),this.table.options.rowDeleted.call(this.table,t.getComponent()),this.table.options.dataEdited.call(this.table,this.getData()),this.table.options.groupBy&&this.table.modExists("groupRows")?this.table.modules.groupRows.updateGroupRows(!0):this.table.options.pagination&&this.table.modExists("page")?this.refreshActiveData(!1,!1,!0):this.table.options.pagination&&this.table.modExists("page")&&this.refreshActiveData("page")},n.prototype.addRow=function(t,e,o,i){var n=this.addRowActual(t,e,o,i);return this.table.options.history&&this.table.modExists("history")&&this.table.modules.history.action("rowAdd",n,{data:t,pos:e,index:o}),n},n.prototype.addRows=function(t,e,o){var i=this,n=this,s=0,r=[];return new Promise(function(a,l){e=i.findAddRowPos(e),Array.isArray(t)||(t=[t]),s=t.length-1,(void 0===o&&e||void 0!==o&&!e)&&t.reverse(),t.forEach(function(t,i){var s=n.addRow(t,e,o,!0);r.push(s)}),i.table.options.groupBy&&i.table.modExists("groupRows")?i.table.modules.groupRows.updateGroupRows(!0):i.table.options.pagination&&i.table.modExists("page")?i.refreshActiveData(!1,!1,!0):i.reRenderInPosition(),i.table.modExists("columnCalcs")&&i.table.modules.columnCalcs.recalc(i.table.rowManager.activeRows),a(r)})},n.prototype.findAddRowPos=function(t){return void 0===t&&(t=this.table.options.addRowPos),"pos"===t&&(t=!0),"bottom"===t&&(t=!1),t},n.prototype.addRowActual=function(t,e,o,i){var n,s=t instanceof r?t:new r(t||{},this),a=this.findAddRowPos(e);if(!o&&this.table.options.pagination&&"page"==this.table.options.paginationAddRow&&(n=this.getDisplayRows(),a?n.length?o=n[0]:this.activeRows.length&&(o=this.activeRows[this.activeRows.length-1],a=!1):n.length&&(o=n[n.length-1],a=!(n.length<this.table.modules.page.getPageSize()))),o&&(o=this.findRow(o)),this.table.options.groupBy&&this.table.modExists("groupRows")){this.table.modules.groupRows.assignRowToGroup(s);var l=s.getGroup().rows;l.length>1&&(!o||o&&-1==l.indexOf(o)?a?l[0]!==s&&(o=l[0],this._moveRowInArray(s.getGroup().rows,s,o,!a)):l[l.length-1]!==s&&(o=l[l.length-1],this._moveRowInArray(s.getGroup().rows,s,o,!a)):this._moveRowInArray(s.getGroup().rows,s,o,!a))}if(o){var c=this.rows.indexOf(o),u=this.activeRows.indexOf(o);this.displayRowIterator(function(t){var e=t.indexOf(o);e>-1&&t.splice(a?e:e+1,0,s)}),u>-1&&this.activeRows.splice(a?u:u+1,0,s),c>-1&&this.rows.splice(a?c:c+1,0,s)}else a?(this.displayRowIterator(function(t){t.unshift(s)}),this.activeRows.unshift(s),this.rows.unshift(s)):(this.displayRowIterator(function(t){t.push(s)}),this.activeRows.push(s),this.rows.push(s));return this.setActiveRows(this.activeRows),this.table.options.rowAdded.call(this.table,s.getComponent()),this.table.options.dataEdited.call(this.table,this.getData()),i||this.reRenderInPosition(),s},n.prototype.moveRow=function(t,e,o){this.table.options.history&&this.table.modExists("history")&&this.table.modules.history.action("rowMove",t,{pos:this.getRowPosition(t),to:e,after:o}),this.moveRowActual(t,e,o),this.table.options.rowMoved.call(this.table,t.getComponent())},n.prototype.moveRowActual=function(t,e,o){var i=this;if(this._moveRowInArray(this.rows,t,e,o),this._moveRowInArray(this.activeRows,t,e,o),this.displayRowIterator(function(n){i._moveRowInArray(n,t,e,o)}),this.table.options.groupBy&&this.table.modExists("groupRows")){var n=e.getGroup(),s=t.getGroup();n===s?this._moveRowInArray(n.rows,t,e,o):(s&&s.removeRow(t),n.insertRow(t,e,o))}},n.prototype._moveRowInArray=function(t,e,o,i){var n,s,r,a;if(e!==o&&(n=t.indexOf(e),n>-1&&(t.splice(n,1),s=t.indexOf(o),s>-1?i?t.splice(s+1,0,e):t.splice(s,0,e):t.splice(n,0,e)),t===this.getDisplayRows())){r=n<s?n:s,a=s>n?s:n+1;for(var l=r;l<=a;l++)t[l]&&this.styleRow(t[l],l)}},n.prototype.clearData=function(){this.setData([])},n.prototype.getRowIndex=function(t){return this.findRowIndex(t,this.rows)},n.prototype.getDisplayRowIndex=function(t){var e=this.getDisplayRows().indexOf(t);return e>-1&&e},n.prototype.nextDisplayRow=function(t,e){var o=this.getDisplayRowIndex(t),i=!1;return!1!==o&&o<this.displayRowsCount-1&&(i=this.getDisplayRows()[o+1]),!i||i instanceof r&&"row"==i.type?i:this.nextDisplayRow(i,e)},n.prototype.prevDisplayRow=function(t,e){var o=this.getDisplayRowIndex(t),i=!1;return o&&(i=this.getDisplayRows()[o-1]),!i||i instanceof r&&"row"==i.type?i:this.prevDisplayRow(i,e)},n.prototype.findRowIndex=function(t,e){var o;return!!((t=this.findRow(t))&&(o=e.indexOf(t))>-1)&&o},n.prototype.getData=function(t,e){var o=[];return this.getRows(t).forEach(function(t){o.push(t.getData(e||"data"))}),o},n.prototype.getComponents=function(t){var e=[];return this.getRows(t).forEach(function(t){e.push(t.getComponent())}),e},n.prototype.getDataCount=function(t){return this.getRows(t).length},n.prototype._genRemoteRequest=function(){var t=this,e=t.table,o=e.options,i={};if(e.modExists("page")){if(o.ajaxSorting){var n=t.table.modules.sort.getSort();n.forEach(function(t){delete t.column}),i[t.table.modules.page.paginationDataSentNames.sorters]=n}if(o.ajaxFiltering){var s=t.table.modules.filter.getFilters(!0,!0);i[t.table.modules.page.paginationDataSentNames.filters]=s}t.table.modules.ajax.setParams(i,!0)}e.modules.ajax.sendRequest().then(function(e){t.setData(e)}).catch(function(t){})},n.prototype.filterRefresh=function(){var t=this.table,e=t.options,o=this.scrollLeft;e.ajaxFiltering?"remote"==e.pagination&&t.modExists("page")?(t.modules.page.reset(!0),t.modules.page.setPage(1).then(function(){}).catch(function(){})):e.ajaxProgressiveLoad?t.modules.ajax.loadData().then(function(){}).catch(function(){}):this._genRemoteRequest():this.refreshActiveData("filter"),this.scrollHorizontal(o)},n.prototype.sorterRefresh=function(t){var e=this.table,o=this.table.options,i=this.scrollLeft;o.ajaxSorting?("remote"==o.pagination||o.progressiveLoad)&&e.modExists("page")?(e.modules.page.reset(!0),e.modules.page.setPage(1).then(function(){}).catch(function(){})):o.ajaxProgressiveLoad?e.modules.ajax.loadData().then(function(){}).catch(function(){}):this._genRemoteRequest():this.refreshActiveData(t?"filter":"sort"),this.scrollHorizontal(i)},n.prototype.scrollHorizontal=function(t){this.scrollLeft=t,this.element.scrollLeft=t,this.table.options.groupBy&&this.table.modules.groupRows.scrollHeaders(t),this.table.modExists("columnCalcs")&&this.table.modules.columnCalcs.scrollHorizontal(t)},n.prototype.refreshActiveData=function(t,e,o){var i,n=this,s=this,r=this.table,a=["all","filter","sort","display","freeze","group","tree","page"];if(this.redrawBlock)return void((!this.redrawBlockRestoreConfig||a.indexOf(t)<a.indexOf(this.redrawBlockRestoreConfig.stage))&&(this.redrawBlockRestoreConfig={stage:t,skipStage:e,renderInPosition:o}));switch(s.table.modExists("edit")&&s.table.modules.edit.cancelEdit(),t||(t="all"),r.options.selectable&&!r.options.selectablePersistence&&r.modExists("selectRow")&&r.modules.selectRow.deselectRows(),t){case"all":case"filter":e?e=!1:r.modExists("filter")?s.setActiveRows(r.modules.filter.filter(s.rows)):s.setActiveRows(s.rows.slice(0));case"sort":e?e=!1:r.modExists("sort")&&r.modules.sort.sort(this.activeRows),this.rowNumColumn&&this.activeRows.forEach(function(t){var e=t.getCell(n.rowNumColumn);e&&e._generateContents()});case"display":this.resetDisplayRows();case"freeze":e?e=!1:this.table.modExists("frozenRows")&&r.modules.frozenRows.isFrozen()&&(r.modules.frozenRows.getDisplayIndex()||r.modules.frozenRows.setDisplayIndex(this.getNextDisplayIndex()),i=r.modules.frozenRows.getDisplayIndex(),!0!==(i=s.setDisplayRows(r.modules.frozenRows.getRows(this.getDisplayRows(i-1)),i))&&r.modules.frozenRows.setDisplayIndex(i));case"group":e?e=!1:r.options.groupBy&&r.modExists("groupRows")&&(r.modules.groupRows.getDisplayIndex()||r.modules.groupRows.setDisplayIndex(this.getNextDisplayIndex()),i=r.modules.groupRows.getDisplayIndex(),!0!==(i=s.setDisplayRows(r.modules.groupRows.getRows(this.getDisplayRows(i-1)),i))&&r.modules.groupRows.setDisplayIndex(i));case"tree":e?e=!1:r.options.dataTree&&r.modExists("dataTree")&&(r.modules.dataTree.getDisplayIndex()||r.modules.dataTree.setDisplayIndex(this.getNextDisplayIndex()),i=r.modules.dataTree.getDisplayIndex(),!0!==(i=s.setDisplayRows(r.modules.dataTree.getRows(this.getDisplayRows(i-1)),i))&&r.modules.dataTree.setDisplayIndex(i)),r.options.pagination&&r.modExists("page")&&!o&&"local"==r.modules.page.getMode()&&r.modules.page.reset();case"page":e?e=!1:r.options.pagination&&r.modExists("page")&&(r.modules.page.getDisplayIndex()||r.modules.page.setDisplayIndex(this.getNextDisplayIndex()),i=r.modules.page.getDisplayIndex(),"local"==r.modules.page.getMode()&&r.modules.page.setMaxRows(this.getDisplayRows(i-1).length),!0!==(i=s.setDisplayRows(r.modules.page.getRows(this.getDisplayRows(i-1)),i))&&r.modules.page.setDisplayIndex(i))}u.prototype.helpers.elVisible(s.element)&&(o?s.reRenderInPosition():(s.renderTable(),r.options.layoutColumnsOnNewData&&s.table.columnManager.redraw(!0))),r.modExists("columnCalcs")&&r.modules.columnCalcs.recalc(this.activeRows)},n.prototype.setActiveRows=function(t){this.activeRows=t,this.activeRowsCount=this.activeRows.length},n.prototype.resetDisplayRows=function(){this.displayRows=[],this.displayRows.push(this.activeRows.slice(0)),this.displayRowsCount=this.displayRows[0].length,this.table.modExists("frozenRows")&&this.table.modules.frozenRows.setDisplayIndex(0),this.table.options.groupBy&&this.table.modExists("groupRows")&&this.table.modules.groupRows.setDisplayIndex(0),this.table.options.pagination&&this.table.modExists("page")&&this.table.modules.page.setDisplayIndex(0)},n.prototype.getNextDisplayIndex=function(){return this.displayRows.length},n.prototype.setDisplayRows=function(t,e){var o=!0;return e&&void 0!==this.displayRows[e]?(this.displayRows[e]=t,o=!0):(this.displayRows.push(t),o=e=this.displayRows.length-1),e==this.displayRows.length-1&&(this.displayRowsCount=this.displayRows[this.displayRows.length-1].length),o},n.prototype.getDisplayRows=function(t){return void 0===t?this.displayRows.length?this.displayRows[this.displayRows.length-1]:[]:this.displayRows[t]||[]},n.prototype.getVisibleRows=function(t){var e=this.element.scrollTop,o=this.element.clientHeight+e,i=!1,n=0,s=0,r=this.getDisplayRows();if(t){this.getDisplayRows();for(var a=this.vDomTop;a<=this.vDomBottom;a++)if(r[a])if(i){if(!(o-r[a].getElement().offsetTop>=0))break;s=a}else if(e-r[a].getElement().offsetTop>=0)n=a;else{if(i=!0,!(o-r[a].getElement().offsetTop>=0))break;s=a}}else n=this.vDomTop,s=this.vDomBottom;return r.slice(n,s+1)},n.prototype.displayRowIterator=function(t){this.displayRows.forEach(t),this.displayRowsCount=this.displayRows[this.displayRows.length-1].length},n.prototype.getRows=function(t){var e;switch(t){case"active":e=this.activeRows;break;case"visible":e=this.getVisibleRows(!0);break;default:e=this.rows}return e},n.prototype.reRenderInPosition=function(t){if("virtual"==this.getRenderMode())if(this.redrawBlock)t?t():this.redrawBlockRederInPosition=!0;else{for(var e=this.element.scrollTop,o=!1,i=!1,n=this.scrollLeft,s=this.getDisplayRows(),r=this.vDomTop;r<=this.vDomBottom;r++)if(s[r]){var a=e-s[r].getElement().offsetTop;if(!(!1===i||Math.abs(a)<i))break;i=a,o=r}t&&t(),this._virtualRenderFill(!1===o?this.displayRowsCount-1:o,!0,i||0),this.scrollHorizontal(n)}else this.renderTable(),t&&t()},n.prototype.setRenderMode=function(){(this.table.element.clientHeight||this.table.options.height)&&this.table.options.virtualDom?this.renderMode="virtual":this.renderMode="classic"},n.prototype.getRenderMode=function(){return this.renderMode},n.prototype.renderTable=function(){var t=this;switch(t.table.options.renderStarted.call(this.table),t.element.scrollTop=0,t.renderMode){case"classic":t._simpleRender();break;case"virtual":t._virtualRenderFill()}t.firstRender&&(t.displayRowsCount?(t.firstRender=!1,t.table.modules.layout.layout()):t.renderEmptyScroll()),t.table.modExists("frozenColumns")&&t.table.modules.frozenColumns.layout(),t.displayRowsCount||t.table.options.placeholder&&(this.renderMode&&t.table.options.placeholder.setAttribute("tabulator-render-mode",this.renderMode),t.getElement().appendChild(t.table.options.placeholder)),t.table.options.renderComplete.call(this.table)},n.prototype._simpleRender=function(){this._clearVirtualDom(),this.displayRowsCount?this.checkClassicModeGroupHeaderWidth():this.renderEmptyScroll()},n.prototype.checkClassicModeGroupHeaderWidth=function(){var t=this,e=this.tableElement,o=!0;t.getDisplayRows().forEach(function(i,n){t.styleRow(i,n),e.appendChild(i.getElement()),i.initialize(!0),"group"!==i.type&&(o=!1)}),e.style.minWidth=o?t.table.columnManager.getWidth()+"px":""},n.prototype.renderEmptyScroll=function(){this.tableElement.style.minWidth=this.table.columnManager.getWidth()+"px",this.tableElement.style.minHeight="1px",this.tableElement.style.visibility="hidden"},n.prototype._clearVirtualDom=function(){var t=this.tableElement;for(this.table.options.placeholder&&this.table.options.placeholder.parentNode&&this.table.options.placeholder.parentNode.removeChild(this.table.options.placeholder);t.firstChild;)t.removeChild(t.firstChild);t.style.paddingTop="",t.style.paddingBottom="",t.style.minWidth="",t.style.minHeight="",t.style.visibility="",this.scrollTop=0,this.scrollLeft=0,this.vDomTop=0,this.vDomBottom=0,this.vDomTopPad=0,this.vDomBottomPad=0},n.prototype.styleRow=function(t,e){var o=t.getElement();e%2?(o.classList.add("tabulator-row-even"),o.classList.remove("tabulator-row-odd")):(o.classList.add("tabulator-row-odd"),o.classList.remove("tabulator-row-even"))},n.prototype._virtualRenderFill=function(t,e,o){var i=this,n=i.tableElement,s=i.element,r=0,a=0,l=0,c=0,d=!0,h=i.getDisplayRows();if(t=t||0,o=o||0,t){for(;n.firstChild;)n.removeChild(n.firstChild);var p=(i.displayRowsCount-t+1)*i.vDomRowHeight;p<i.height&&(t-=Math.ceil((i.height-p)/i.vDomRowHeight))<0&&(t=0),r=Math.min(Math.max(Math.floor(i.vDomWindowBuffer/i.vDomRowHeight),i.vDomWindowMinMarginRows),t),t-=r}else i._clearVirtualDom();if(i.displayRowsCount&&u.prototype.helpers.elVisible(i.element)){for(i.vDomTop=t,i.vDomBottom=t-1;(a<=i.height+i.vDomWindowBuffer||c<i.vDomWindowMinTotalRows)&&i.vDomBottom<i.displayRowsCount-1;){var m=i.vDomBottom+1,f=h[m],g=0;i.styleRow(f,m),n.appendChild(f.getElement()),f.initialized?f.heightInitialized||f.normalizeHeight(!0):f.initialize(!0),g=f.getHeight(),c<r?l+=g:a+=g,g>this.vDomWindowBuffer&&(this.vDomWindowBuffer=2*g),"group"!==f.type&&(d=!1),i.vDomBottom++,c++}t?(i.vDomTopPad=e?i.vDomRowHeight*this.vDomTop+o:i.scrollTop-l,i.vDomBottomPad=i.vDomBottom==i.displayRowsCount-1?0:Math.max(i.vDomScrollHeight-i.vDomTopPad-a-l,0)):(this.vDomTopPad=0,i.vDomRowHeight=Math.floor((a+l)/c),i.vDomBottomPad=i.vDomRowHeight*(i.displayRowsCount-i.vDomBottom-1),i.vDomScrollHeight=l+a+i.vDomBottomPad-i.height),n.style.paddingTop=i.vDomTopPad+"px",n.style.paddingBottom=i.vDomBottomPad+"px",e&&(this.scrollTop=i.vDomTopPad+l+o-(this.element.scrollWidth>this.element.clientWidth?this.element.offsetHeight-this.element.clientHeight:0)),this.scrollTop=Math.min(this.scrollTop,this.element.scrollHeight-this.height),this.element.scrollWidth>this.element.offsetWidth&&e&&(this.scrollTop+=this.element.offsetHeight-this.element.clientHeight),this.vDomScrollPosTop=this.scrollTop,this.vDomScrollPosBottom=this.scrollTop,s.scrollTop=this.scrollTop,n.style.minWidth=d?i.table.columnManager.getWidth()+"px":"",i.table.options.groupBy&&"fitDataFill"!=i.table.modules.layout.getMode()&&i.displayRowsCount==i.table.modules.groupRows.countGroups()&&(i.tableElement.style.minWidth=i.table.columnManager.getWidth())}else this.renderEmptyScroll()},n.prototype.scrollVertical=function(t){var e=this.scrollTop-this.vDomScrollPosTop,o=this.scrollTop-this.vDomScrollPosBottom,i=2*this.vDomWindowBuffer;if(-e>i||o>i){var n=this.scrollLeft;this._virtualRenderFill(Math.floor(this.element.scrollTop/this.element.scrollHeight*this.displayRowsCount)),this.scrollHorizontal(n)}else t?(e<0&&this._addTopRow(-e),o<0&&this.vDomScrollHeight-this.scrollTop>this.vDomWindowBuffer&&this._removeBottomRow(-o)):(e>=0&&this.scrollTop>this.vDomWindowBuffer&&this._removeTopRow(e),o>=0&&this._addBottomRow(o))},n.prototype._addTopRow=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=this.tableElement,i=this.getDisplayRows();if(this.vDomTop){var n=this.vDomTop-1,s=i[n],r=s.getHeight()||this.vDomRowHeight;t>=r&&(this.styleRow(s,n),o.insertBefore(s.getElement(),o.firstChild),s.initialized&&s.heightInitialized||(this.vDomTopNewRows.push(s),s.heightInitialized||s.clearCellHeight()),s.initialize(),this.vDomTopPad-=r,this.vDomTopPad<0&&(this.vDomTopPad=n*this.vDomRowHeight),n||(this.vDomTopPad=0),o.style.paddingTop=this.vDomTopPad+"px",this.vDomScrollPosTop-=r,this.vDomTop--),t=-(this.scrollTop-this.vDomScrollPosTop),s.getHeight()>this.vDomWindowBuffer&&(this.vDomWindowBuffer=2*s.getHeight()),e<this.vDomMaxRenderChain&&this.vDomTop&&t>=(i[this.vDomTop-1].getHeight()||this.vDomRowHeight)?this._addTopRow(t,e+1):this._quickNormalizeRowHeight(this.vDomTopNewRows)}},n.prototype._removeTopRow=function(t){var e=this.tableElement,o=this.getDisplayRows()[this.vDomTop],i=o.getHeight()||this.vDomRowHeight;if(t>=i){var n=o.getElement();n.parentNode.removeChild(n),this.vDomTopPad+=i,e.style.paddingTop=this.vDomTopPad+"px",this.vDomScrollPosTop+=this.vDomTop?i:i+this.vDomWindowBuffer,this.vDomTop++,t=this.scrollTop-this.vDomScrollPosTop,this._removeTopRow(t)}},n.prototype._addBottomRow=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=this.tableElement,i=this.getDisplayRows();if(this.vDomBottom<this.displayRowsCount-1){var n=this.vDomBottom+1,s=i[n],r=s.getHeight()||this.vDomRowHeight;t>=r&&(this.styleRow(s,n),o.appendChild(s.getElement()),s.initialized&&s.heightInitialized||(this.vDomBottomNewRows.push(s),s.heightInitialized||s.clearCellHeight()),s.initialize(),this.vDomBottomPad-=r,(this.vDomBottomPad<0||n==this.displayRowsCount-1)&&(this.vDomBottomPad=0),o.style.paddingBottom=this.vDomBottomPad+"px",this.vDomScrollPosBottom+=r,this.vDomBottom++),t=this.scrollTop-this.vDomScrollPosBottom,s.getHeight()>this.vDomWindowBuffer&&(this.vDomWindowBuffer=2*s.getHeight()),e<this.vDomMaxRenderChain&&this.vDomBottom<this.displayRowsCount-1&&t>=(i[this.vDomBottom+1].getHeight()||this.vDomRowHeight)?this._addBottomRow(t,e+1):this._quickNormalizeRowHeight(this.vDomBottomNewRows)}},n.prototype._removeBottomRow=function(t){var e=this.tableElement,o=this.getDisplayRows()[this.vDomBottom],i=o.getHeight()||this.vDomRowHeight;if(t>=i){var n=o.getElement();n.parentNode&&n.parentNode.removeChild(n),this.vDomBottomPad+=i,this.vDomBottomPad<0&&(this.vDomBottomPad=0),e.style.paddingBottom=this.vDomBottomPad+"px",this.vDomScrollPosBottom-=i,this.vDomBottom--,t=-(this.scrollTop-this.vDomScrollPosBottom),this._removeBottomRow(t)}},n.prototype._quickNormalizeRowHeight=function(t){t.forEach(function(t){t.calcHeight()}),t.forEach(function(t){t.setCellHeight()}),t.length=0},n.prototype.normalizeHeight=function(){this.activeRows.forEach(function(t){t.normalizeHeight()})},n.prototype.adjustTableSize=function(){if("virtual"===this.renderMode){this.height=this.element.clientHeight,this.vDomWindowBuffer=this.table.options.virtualDomBuffer||this.height;var t=this.columnManager.getElement().offsetHeight+(this.table.footerManager&&!this.table.footerManager.external?this.table.footerManager.getElement().offsetHeight:0);this.element.style.minHeight="calc(100% - "+t+"px)",this.element.style.height="calc(100% - "+t+"px)",this.element.style.maxHeight="calc(100% - "+t+"px)"}},n.prototype.reinitialize=function(){this.rows.forEach(function(t){t.reinitialize()})},n.prototype.blockRedraw=function(){this.redrawBlock=!0,this.redrawBlockRestoreConfig=!1},n.prototype.restoreRedraw=function(){this.redrawBlock=!1,this.redrawBlockRestoreConfig?(this.refreshActiveData(this.redrawBlockRestoreConfig.stage,this.redrawBlockRestoreConfig.skipStage,this.redrawBlockRestoreConfig.renderInPosition),this.redrawBlockRestoreConfig=!1):this.redrawBlockRederInPosition&&this.reRenderInPosition(),this.redrawBlockRederInPosition=!1},n.prototype.redraw=function(t){var e=this.scrollLeft;this.adjustTableSize(),this.table.tableWidth=this.table.element.clientWidth,t?this.renderTable():("classic"==this.renderMode?this.table.options.groupBy?this.refreshActiveData("group",!1,!1):this._simpleRender():(this.reRenderInPosition(),this.scrollHorizontal(e)),this.displayRowsCount||this.table.options.placeholder&&this.getElement().appendChild(this.table.options.placeholder))},n.prototype.resetScroll=function(){if(this.element.scrollLeft=0,this.element.scrollTop=0,"ie"===this.table.browser){var t=document.createEvent("Event");t.initEvent("scroll",!1,!0),this.element.dispatchEvent(t)}else this.element.dispatchEvent(new Event("scroll"))};var s=function(t){this._row=t};s.prototype.getData=function(t){return this._row.getData(t)},s.prototype.getElement=function(){return this._row.getElement()},s.prototype.getCells=function(){var t=[];return this._row.getCells().forEach(function(e){t.push(e.getComponent())}),t},s.prototype.getCell=function(t){var e=this._row.getCell(t);return!!e&&e.getComponent()},s.prototype.getIndex=function(){return this._row.getData("data")[this._row.table.options.index]},s.prototype.getPosition=function(t){return this._row.table.rowManager.getRowPosition(this._row,t)},s.prototype.delete=function(){return this._row.delete()},s.prototype.scrollTo=function(){return this._row.table.rowManager.scrollToRow(this._row)},s.prototype.pageTo=function(){if(this._row.table.modExists("page",!0))return this._row.table.modules.page.setPageToRow(this._row)},s.prototype.move=function(t,e){this._row.moveToRow(t,e)},s.prototype.update=function(t){return this._row.updateData(t)},s.prototype.normalizeHeight=function(){this._row.normalizeHeight(!0)},s.prototype.select=function(){this._row.table.modules.selectRow.selectRows(this._row)},s.prototype.deselect=function(){this._row.table.modules.selectRow.deselectRows(this._row)},s.prototype.toggleSelect=function(){this._row.table.modules.selectRow.toggleRow(this._row)},s.prototype.isSelected=function(){return this._row.table.modules.selectRow.isRowSelected(this._row)},s.prototype._getSelf=function(){return this._row},s.prototype.freeze=function(){this._row.table.modExists("frozenRows",!0)&&this._row.table.modules.frozenRows.freezeRow(this._row)},s.prototype.unfreeze=function(){this._row.table.modExists("frozenRows",!0)&&this._row.table.modules.frozenRows.unfreezeRow(this._row)},s.prototype.treeCollapse=function(){this._row.table.modExists("dataTree",!0)&&this._row.table.modules.dataTree.collapseRow(this._row)},s.prototype.treeExpand=function(){this._row.table.modExists("dataTree",!0)&&this._row.table.modules.dataTree.expandRow(this._row)},s.prototype.treeToggle=function(){this._row.table.modExists("dataTree",!0)&&this._row.table.modules.dataTree.toggleRow(this._row)},s.prototype.getTreeParent=function(){return!!this._row.table.modExists("dataTree",!0)&&this._row.table.modules.dataTree.getTreeParent(this._row)},s.prototype.getTreeChildren=function(){return!!this._row.table.modExists("dataTree",!0)&&this._row.table.modules.dataTree.getTreeChildren(this._row)},s.prototype.reformat=function(){return this._row.reinitialize()},s.prototype.getGroup=function(){return this._row.getGroup().getComponent()},s.prototype.getTable=function(){return this._row.table},s.prototype.getNextRow=function(){var t=this._row.nextRow();return t?t.getComponent():t},s.prototype.getPrevRow=function(){var t=this._row.prevRow();return t?t.getComponent():t};var r=function(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"row";this.table=e.table,this.parent=e,this.data={},this.type=o,this.element=this.createElement(),this.modules={},this.cells=[],this.height=0,this.heightStyled="",this.manualHeight=!1,this.outerHeight=0,this.initialized=!1,this.heightInitialized=!1,this.setData(t),this.generateElement()};r.prototype.createElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-row"),t.setAttribute("role","row"),t},r.prototype.getElement=function(){return this.element},r.prototype.detachElement=function(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},r.prototype.generateElement=function(){var t,e,o,i=this;!1!==i.table.options.selectable&&i.table.modExists("selectRow")&&i.table.modules.selectRow.initializeRow(this),!1!==i.table.options.movableRows&&i.table.modExists("moveRow")&&i.table.modules.moveRow.initializeRow(this),!1!==i.table.options.dataTree&&i.table.modExists("dataTree")&&i.table.modules.dataTree.initializeRow(this),"collapse"===i.table.options.responsiveLayout&&i.table.modExists("responsiveLayout")&&i.table.modules.responsiveLayout.initializeRow(this),i.table.options.rowClick&&i.element.addEventListener("click",function(t){i.table.options.rowClick(t,i.getComponent())}),i.table.options.rowDblClick&&i.element.addEventListener("dblclick",function(t){i.table.options.rowDblClick(t,i.getComponent())}),i.table.options.rowContext&&i.element.addEventListener("contextmenu",function(t){i.table.options.rowContext(t,i.getComponent())}),i.table.options.rowMouseEnter&&i.element.addEventListener("mouseenter",function(t){i.table.options.rowMouseEnter(t,i.getComponent())}),i.table.options.rowMouseLeave&&i.element.addEventListener("mouseleave",function(t){i.table.options.rowMouseLeave(t,i.getComponent())}),i.table.options.rowMouseOver&&i.element.addEventListener("mouseover",function(t){i.table.options.rowMouseOver(t,i.getComponent())}),i.table.options.rowMouseOut&&i.element.addEventListener("mouseout",function(t){i.table.options.rowMouseOut(t,i.getComponent())}),i.table.options.rowMouseMove&&i.element.addEventListener("mousemove",function(t){i.table.options.rowMouseMove(t,i.getComponent())}),i.table.options.rowTap&&(o=!1,i.element.addEventListener("touchstart",function(t){o=!0},{passive:!0}),i.element.addEventListener("touchend",function(t){o&&i.table.options.rowTap(t,i.getComponent()),o=!1})),i.table.options.rowDblTap&&(t=null,i.element.addEventListener("touchend",function(e){t?(clearTimeout(t),t=null,
i.table.options.rowDblTap(e,i.getComponent())):t=setTimeout(function(){clearTimeout(t),t=null},300)})),i.table.options.rowTapHold&&(e=null,i.element.addEventListener("touchstart",function(t){clearTimeout(e),e=setTimeout(function(){clearTimeout(e),e=null,o=!1,i.table.options.rowTapHold(t,i.getComponent())},1e3)},{passive:!0}),i.element.addEventListener("touchend",function(t){clearTimeout(e),e=null}))},r.prototype.generateCells=function(){this.cells=this.table.columnManager.generateCells(this)},r.prototype.initialize=function(t){var e=this;if(!e.initialized||t){for(e.deleteCells();e.element.firstChild;)e.element.removeChild(e.element.firstChild);this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.layoutRow(this),this.generateCells(),e.cells.forEach(function(t){e.element.appendChild(t.getElement()),t.cellRendered()}),t&&e.normalizeHeight(),e.table.options.dataTree&&e.table.modExists("dataTree")&&e.table.modules.dataTree.layoutRow(this),"collapse"===e.table.options.responsiveLayout&&e.table.modExists("responsiveLayout")&&e.table.modules.responsiveLayout.layoutRow(this),e.table.options.rowFormatter&&e.table.options.rowFormatter(e.getComponent()),e.table.options.resizableRows&&e.table.modExists("resizeRows")&&e.table.modules.resizeRows.initializeRow(e),e.initialized=!0}},r.prototype.reinitializeHeight=function(){this.heightInitialized=!1,null!==this.element.offsetParent&&this.normalizeHeight(!0)},r.prototype.reinitialize=function(){this.initialized=!1,this.heightInitialized=!1,this.manualHeight||(this.height=0,this.heightStyled=""),null!==this.element.offsetParent&&this.initialize(!0)},r.prototype.calcHeight=function(t){var e=0,o=this.table.options.resizableRows?this.element.clientHeight:0;this.cells.forEach(function(t){var o=t.getHeight();o>e&&(e=o)}),this.height=t?Math.max(e,o):this.manualHeight?this.height:Math.max(e,o),this.heightStyled=this.height?this.height+"px":"",this.outerHeight=this.element.offsetHeight},r.prototype.setCellHeight=function(){this.cells.forEach(function(t){t.setHeight()}),this.heightInitialized=!0},r.prototype.clearCellHeight=function(){this.cells.forEach(function(t){t.clearHeight()})},r.prototype.normalizeHeight=function(t){t&&this.clearCellHeight(),this.calcHeight(t),this.setCellHeight()},r.prototype.setHeight=function(t,e){(this.height!=t||e)&&(this.manualHeight=!0,this.height=t,this.heightStyled=t?t+"px":"",this.setCellHeight(),this.outerHeight=this.element.offsetHeight)},r.prototype.getHeight=function(){return this.outerHeight},r.prototype.getWidth=function(){return this.element.offsetWidth},r.prototype.deleteCell=function(t){var e=this.cells.indexOf(t);e>-1&&this.cells.splice(e,1)},r.prototype.setData=function(t){this.table.modExists("mutator")&&(t=this.table.modules.mutator.transformRow(t,"data",t)),this.data=t,this.table.options.reactiveData&&this.table.modExists("reactiveData",!0)&&this.table.modules.reactiveData.watchRow(this)},r.prototype.updateData=function(t){var e=this,o=u.prototype.helpers.elVisible(this.element),i={};return new Promise(function(n,s){"string"==typeof t&&(t=JSON.parse(t)),e.table.options.reactiveData&&e.table.modExists("reactiveData",!0)&&e.table.modules.reactiveData.block(),e.table.modExists("mutator")&&(i=Object.assign(i,e.data),i=Object.assign(i,t),t=e.table.modules.mutator.transformRow(i,"data",t));for(var r in t)e.data[r]=t[r];e.table.options.reactiveData&&e.table.modExists("reactiveData",!0)&&e.table.modules.reactiveData.unblock();for(var r in t){e.table.columnManager.getColumnsByFieldRoot(r).forEach(function(i){var n=e.getCell(i.getField());if(n){var s=i.getFieldValue(t);n.getValue()!=s&&(n.setValueProcessData(s),o&&n.cellRendered())}})}o?(e.normalizeHeight(),e.table.options.rowFormatter&&e.table.options.rowFormatter(e.getComponent())):(e.initialized=!1,e.height=0,e.heightStyled=""),!1!==e.table.options.dataTree&&e.table.modExists("dataTree")&&e.table.modules.dataTree.redrawNeeded(t)&&(e.table.modules.dataTree.initializeRow(e),e.table.modules.dataTree.layoutRow(e),e.table.rowManager.refreshActiveData("tree",!1,!0)),e.table.options.rowUpdated.call(e.table,e.getComponent()),n()})},r.prototype.getData=function(t){var e=this;return t?e.table.modExists("accessor")?e.table.modules.accessor.transformRow(e.data,t):void 0:this.data},r.prototype.getCell=function(t){return t=this.table.columnManager.findColumn(t),this.cells.find(function(e){return e.column===t})},r.prototype.getCellIndex=function(t){return this.cells.findIndex(function(e){return e===t})},r.prototype.findNextEditableCell=function(t){var e=!1;if(t<this.cells.length-1)for(var o=t+1;o<this.cells.length;o++){var i=this.cells[o];if(i.column.modules.edit&&u.prototype.helpers.elVisible(i.getElement())){var n=!0;if("function"==typeof i.column.modules.edit.check&&(n=i.column.modules.edit.check(i.getComponent())),n){e=i;break}}}return e},r.prototype.findPrevEditableCell=function(t){var e=!1;if(t>0)for(var o=t-1;o>=0;o--){var i=this.cells[o],n=!0;if(i.column.modules.edit&&u.prototype.helpers.elVisible(i.getElement())&&("function"==typeof i.column.modules.edit.check&&(n=i.column.modules.edit.check(i.getComponent())),n)){e=i;break}}return e},r.prototype.getCells=function(){return this.cells},r.prototype.nextRow=function(){return this.table.rowManager.nextDisplayRow(this,!0)||!1},r.prototype.prevRow=function(){return this.table.rowManager.prevDisplayRow(this,!0)||!1},r.prototype.moveToRow=function(t,e){var o=this.table.rowManager.findRow(t);o?(this.table.rowManager.moveRowActual(this,o,!e),this.table.rowManager.refreshActiveData("display",!1,!0)):console.warn("Move Error - No matching row found:",t)},r.prototype.delete=function(){var t=this;return new Promise(function(e,o){var i,n;t.table.options.history&&t.table.modExists("history")&&(t.table.options.groupBy&&t.table.modExists("groupRows")?(n=t.getGroup().rows,(i=n.indexOf(t))&&(i=n[i-1])):(i=t.table.rowManager.getRowIndex(t))&&(i=t.table.rowManager.rows[i-1]),t.table.modules.history.action("rowDelete",t,{data:t.getData(),pos:!i,index:i})),t.deleteActual(),e()})},r.prototype.deleteActual=function(t){this.table.rowManager.getRowIndex(this);this.table.modExists("selectRow")&&this.table.modules.selectRow._deselectRow(this,!0),this.table.options.reactiveData&&this.table.modExists("reactiveData",!0),this.modules.group&&this.modules.group.removeRow(this),this.table.rowManager.deleteRow(this,t),this.deleteCells(),this.initialized=!1,this.heightInitialized=!1,this.table.modExists("columnCalcs")&&(this.table.options.groupBy&&this.table.modExists("groupRows")?this.table.modules.columnCalcs.recalcRowGroup(this):this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows))},r.prototype.deleteCells=function(){for(var t=this.cells.length,e=0;e<t;e++)this.cells[0].delete()},r.prototype.wipe=function(){for(this.deleteCells();this.element.firstChild;)this.element.removeChild(this.element.firstChild);this.element=!1,this.modules={},this.element.parentNode&&this.element.parentNode.removeChild(this.element)},r.prototype.getGroup=function(){return this.modules.group||!1},r.prototype.getComponent=function(){return new s(this)};var a=function(t){this._cell=t};a.prototype.getValue=function(){return this._cell.getValue()},a.prototype.getOldValue=function(){return this._cell.getOldValue()},a.prototype.getElement=function(){return this._cell.getElement()},a.prototype.getRow=function(){return this._cell.row.getComponent()},a.prototype.getData=function(){return this._cell.row.getData()},a.prototype.getField=function(){return this._cell.column.getField()},a.prototype.getColumn=function(){return this._cell.column.getComponent()},a.prototype.setValue=function(t,e){void 0===e&&(e=!0),this._cell.setValue(t,e)},a.prototype.restoreOldValue=function(){this._cell.setValueActual(this._cell.getOldValue())},a.prototype.edit=function(t){return this._cell.edit(t)},a.prototype.cancelEdit=function(){this._cell.cancelEdit()},a.prototype.nav=function(){return this._cell.nav()},a.prototype.checkHeight=function(){this._cell.checkHeight()},a.prototype.getTable=function(){return this._cell.table},a.prototype._getSelf=function(){return this._cell};var l=function(t,e){this.table=t.table,this.column=t,this.row=e,this.element=null,this.value=null,this.oldValue=null,this.modules={},this.height=null,this.width=null,this.minWidth=null,this.build()};l.prototype.build=function(){this.generateElement(),this.setWidth(),this._configureCell(),this.setValueActual(this.column.getFieldValue(this.row.data))},l.prototype.generateElement=function(){this.element=document.createElement("div"),this.element.className="tabulator-cell",this.element.setAttribute("role","gridcell"),this.element=this.element},l.prototype._configureCell=function(){var t=this,e=t.column.cellEvents,o=t.element,i=this.column.getField();if(o.style.textAlign=t.column.hozAlign,i&&o.setAttribute("tabulator-field",i),t.column.definition.cssClass){t.column.definition.cssClass.split(" ").forEach(function(t){o.classList.add(t)})}"hover"===this.table.options.tooltipGenerationMode&&o.addEventListener("mouseenter",function(e){t._generateTooltip()}),t._bindClickEvents(e),t._bindTouchEvents(e),t._bindMouseEvents(e),t.column.modules.edit&&t.table.modules.edit.bindEditor(t),t.column.definition.rowHandle&&!1!==t.table.options.movableRows&&t.table.modExists("moveRow")&&t.table.modules.moveRow.initializeCell(t),t.column.visible||t.hide()},l.prototype._bindClickEvents=function(t){var e=this,o=e.element;(t.cellClick||e.table.options.cellClick)&&o.addEventListener("click",function(o){var i=e.getComponent();t.cellClick&&t.cellClick.call(e.table,o,i),e.table.options.cellClick&&e.table.options.cellClick.call(e.table,o,i)}),t.cellDblClick||this.table.options.cellDblClick?o.addEventListener("dblclick",function(o){var i=e.getComponent();t.cellDblClick&&t.cellDblClick.call(e.table,o,i),e.table.options.cellDblClick&&e.table.options.cellDblClick.call(e.table,o,i)}):o.addEventListener("dblclick",function(t){t.preventDefault();try{if(document.selection){var o=document.body.createTextRange();o.moveToElementText(e.element),o.select()}else if(window.getSelection){var o=document.createRange();o.selectNode(e.element),window.getSelection().removeAllRanges(),window.getSelection().addRange(o)}}catch(t){}}),(t.cellContext||this.table.options.cellContext)&&o.addEventListener("contextmenu",function(o){var i=e.getComponent();t.cellContext&&t.cellContext.call(e.table,o,i),e.table.options.cellContext&&e.table.options.cellContext.call(e.table,o,i)})},l.prototype._bindMouseEvents=function(t){var e=this,o=e.element;(t.cellMouseEnter||e.table.options.cellMouseEnter)&&o.addEventListener("mouseenter",function(o){var i=e.getComponent();t.cellMouseEnter&&t.cellMouseEnter.call(e.table,o,i),e.table.options.cellMouseEnter&&e.table.options.cellMouseEnter.call(e.table,o,i)}),(t.cellMouseLeave||e.table.options.cellMouseLeave)&&o.addEventListener("mouseleave",function(o){var i=e.getComponent();t.cellMouseLeave&&t.cellMouseLeave.call(e.table,o,i),e.table.options.cellMouseLeave&&e.table.options.cellMouseLeave.call(e.table,o,i)}),(t.cellMouseOver||e.table.options.cellMouseOver)&&o.addEventListener("mouseover",function(o){var i=e.getComponent();t.cellMouseOver&&t.cellMouseOver.call(e.table,o,i),e.table.options.cellMouseOver&&e.table.options.cellMouseOver.call(e.table,o,i)}),(t.cellMouseOut||e.table.options.cellMouseOut)&&o.addEventListener("mouseout",function(o){var i=e.getComponent();t.cellMouseOut&&t.cellMouseOut.call(e.table,o,i),e.table.options.cellMouseOut&&e.table.options.cellMouseOut.call(e.table,o,i)}),(t.cellMouseMove||e.table.options.cellMouseMove)&&o.addEventListener("mousemove",function(o){var i=e.getComponent();t.cellMouseMove&&t.cellMouseMove.call(e.table,o,i),e.table.options.cellMouseMove&&e.table.options.cellMouseMove.call(e.table,o,i)})},l.prototype._bindTouchEvents=function(t){var e,o,i,n=this,s=n.element;(t.cellTap||this.table.options.cellTap)&&(i=!1,s.addEventListener("touchstart",function(t){i=!0},{passive:!0}),s.addEventListener("touchend",function(e){if(i){var o=n.getComponent();t.cellTap&&t.cellTap.call(n.table,e,o),n.table.options.cellTap&&n.table.options.cellTap.call(n.table,e,o)}i=!1})),(t.cellDblTap||this.table.options.cellDblTap)&&(e=null,s.addEventListener("touchend",function(o){if(e){clearTimeout(e),e=null;var i=n.getComponent();t.cellDblTap&&t.cellDblTap.call(n.table,o,i),n.table.options.cellDblTap&&n.table.options.cellDblTap.call(n.table,o,i)}else e=setTimeout(function(){clearTimeout(e),e=null},300)})),(t.cellTapHold||this.table.options.cellTapHold)&&(o=null,s.addEventListener("touchstart",function(e){clearTimeout(o),o=setTimeout(function(){clearTimeout(o),o=null,i=!1;var s=n.getComponent();t.cellTapHold&&t.cellTapHold.call(n.table,e,s),n.table.options.cellTapHold&&n.table.options.cellTapHold.call(n.table,e,s)},1e3)},{passive:!0}),s.addEventListener("touchend",function(t){clearTimeout(o),o=null}))},l.prototype._generateContents=function(){var t;switch(t=this.table.modExists("format")?this.table.modules.format.formatValue(this):this.element.innerHTML=this.value,void 0===t?"undefined":_typeof(t)){case"object":if(t instanceof Node){for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);this.element.appendChild(t)}else this.element.innerHTML="",null!=t&&console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:",t);break;case"undefined":case"null":this.element.innerHTML="";break;default:this.element.innerHTML=t}},l.prototype.cellRendered=function(){this.table.modExists("format")&&this.table.modules.format.cellRendered&&this.table.modules.format.cellRendered(this)},l.prototype._generateTooltip=function(){var t=this.column.tooltip;t?(!0===t?t=this.value:"function"==typeof t&&!1===(t=t(this.getComponent()))&&(t=""),void 0===t&&(t=""),this.element.setAttribute("title",t)):this.element.setAttribute("title","")},l.prototype.getElement=function(){return this.element},l.prototype.getValue=function(){return this.value},l.prototype.getOldValue=function(){return this.oldValue},l.prototype.setValue=function(t,e){var o,i=this.setValueProcessData(t,e);i&&(this.table.options.history&&this.table.modExists("history")&&this.table.modules.history.action("cellEdit",this,{oldValue:this.oldValue,newValue:this.value}),o=this.getComponent(),this.column.cellEvents.cellEdited&&this.column.cellEvents.cellEdited.call(this.table,o),this.table.options.cellEdited.call(this.table,o),this.table.options.dataEdited.call(this.table,this.table.rowManager.getData()))},l.prototype.setValueProcessData=function(t,e){var o=!1;return this.value!=t&&(o=!0,e&&this.column.modules.mutate&&(t=this.table.modules.mutator.transformCell(this,t))),this.setValueActual(t),o&&this.table.modExists("columnCalcs")&&(this.column.definition.topCalc||this.column.definition.bottomCalc)&&(this.table.options.groupBy&&this.table.modExists("groupRows")?("table"!=this.table.options.columnCalcs&&"both"!=this.table.options.columnCalcs||this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows),"table"!=this.table.options.columnCalcs&&this.table.modules.columnCalcs.recalcRowGroup(this.row)):this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows)),o},l.prototype.setValueActual=function(t){this.oldValue=this.value,this.value=t,this.table.options.reactiveData&&this.table.modExists("reactiveData")&&this.table.modules.reactiveData.block(),this.column.setFieldValue(this.row.data,t),this.table.options.reactiveData&&this.table.modExists("reactiveData")&&this.table.modules.reactiveData.unblock(),this._generateContents(),this._generateTooltip(),this.table.options.resizableColumns&&this.table.modExists("resizeColumns")&&this.table.modules.resizeColumns.initializeColumn("cell",this.column,this.element),this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.layoutElement(this.element,this.column)},l.prototype.setWidth=function(){this.width=this.column.width,this.element.style.width=this.column.widthStyled},l.prototype.clearWidth=function(){this.width="",this.element.style.width=""},l.prototype.getWidth=function(){return this.width||this.element.offsetWidth},l.prototype.setMinWidth=function(){this.minWidth=this.column.minWidth,this.element.style.minWidth=this.column.minWidthStyled},l.prototype.checkHeight=function(){this.row.reinitializeHeight()},l.prototype.clearHeight=function(){this.element.style.height="",this.height=null},l.prototype.setHeight=function(){this.height=this.row.height,this.element.style.height=this.row.heightStyled},l.prototype.getHeight=function(){return this.height||this.element.offsetHeight},l.prototype.show=function(){this.element.style.display=""},l.prototype.hide=function(){this.element.style.display="none"},l.prototype.edit=function(t){if(this.table.modExists("edit",!0))return this.table.modules.edit.editCell(this,t)},l.prototype.cancelEdit=function(){if(this.table.modExists("edit",!0)){var t=this.table.modules.edit.getCurrentCell();t&&t._getSelf()===this?this.table.modules.edit.cancelEdit():console.warn("Cancel Editor Error - This cell is not currently being edited ")}},l.prototype.delete=function(){this.table.rowManager.redrawBlock||this.element.parentNode.removeChild(this.element),this.element=!1,this.column.deleteCell(this),this.row.deleteCell(this),this.calcs={}},l.prototype.nav=function(){var t=this,e=!1,o=this.row.getCellIndex(this);return{next:function(){var e,o=this.right();return!!o||!(!(e=t.table.rowManager.nextDisplayRow(t.row,!0))||!(o=e.findNextEditableCell(-1)))&&(o.edit(),!0)},prev:function(){var e,o=this.left();return!!o||!(!(e=t.table.rowManager.prevDisplayRow(t.row,!0))||!(o=e.findPrevEditableCell(e.cells.length)))&&(o.edit(),!0)},left:function(){return!!(e=t.row.findPrevEditableCell(o))&&(e.edit(),!0)},right:function(){return!!(e=t.row.findNextEditableCell(o))&&(e.edit(),!0)},up:function(){var e=t.table.rowManager.prevDisplayRow(t.row,!0);e&&e.cells[o].edit()},down:function(){var e=t.table.rowManager.nextDisplayRow(t.row,!0);e&&e.cells[o].edit()}}},l.prototype.getIndex=function(){this.row.getCellIndex(this)},l.prototype.getComponent=function(){return new a(this)};var c=function(t){this.table=t,this.active=!1,this.element=this.createElement(),this.external=!1,this.links=[],this._initialize()};c.prototype.createElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-footer"),t},c.prototype._initialize=function(t){if(this.table.options.footerElement)switch(_typeof(this.table.options.footerElement)){case"string":"<"===this.table.options.footerElement[0]?this.element.innerHTML=this.table.options.footerElement:(this.external=!0,this.element=document.querySelector(this.table.options.footerElement));break;default:this.element=this.table.options.footerElement}},c.prototype.getElement=function(){return this.element},c.prototype.append=function(t,e){this.activate(e),this.element.appendChild(t),this.table.rowManager.adjustTableSize()},c.prototype.prepend=function(t,e){this.activate(e),this.element.insertBefore(t,this.element.firstChild),this.table.rowManager.adjustTableSize()},c.prototype.remove=function(t){t.parentNode.removeChild(t),this.deactivate()},c.prototype.deactivate=function(t){this.element.firstChild&&!t||(this.external||this.element.parentNode.removeChild(this.element),this.active=!1)},c.prototype.activate=function(t){this.active||(this.active=!0,this.external||(this.table.element.appendChild(this.getElement()),this.table.element.style.display="")),t&&this.links.push(t)},c.prototype.redraw=function(){this.links.forEach(function(t){t.footerRedraw()})};var u=function t(e,o){this.options={},this.columnManager=null,this.rowManager=null,this.footerManager=null,this.browser="",this.browserSlow=!1,this.browserMobile=!1,this.modules={},this.initializeElement(e),this.initializeOptions(o||{}),this._create(),t.prototype.comms.register(this)};u.prototype.defaultOptions={height:!1,layout:"fitData",layoutColumnsOnNewData:!1,columnMinWidth:40,columnHeaderVertAlign:"top",columnVertAlign:!1,resizableColumns:!0,resizableRows:!1,autoResize:!0,columns:[],data:[],autoColumns:!1,reactiveData:!1,nestedFieldSeparator:".",tooltips:!1,tooltipsHeader:!1,tooltipGenerationMode:"load",initialSort:!1,initialFilter:!1,initialHeaderFilter:!1,columnHeaderSortMulti:!0,sortOrderReverse:!1,headerSort:!0,headerSortTristate:!1,footerElement:!1,index:"id",keybindings:[],tabEndNewRow:!1,invalidOptionWarnings:!0,clipboard:!1,clipboardCopyStyled:!0,clipboardCopySelector:"active",clipboardCopyFormatter:"table",clipboardPasteParser:"table",clipboardPasteAction:"insert",clipboardCopyConfig:!1,clipboardCopied:function(){},clipboardPasted:function(){},clipboardPasteError:function(){},downloadDataFormatter:!1,downloadReady:function(t,e){return e},downloadComplete:!1,downloadConfig:!1,dataTree:!1,dataTreeElementColumn:!1,dataTreeBranchElement:!0,dataTreeChildIndent:9,dataTreeChildField:"_children",dataTreeCollapseElement:!1,dataTreeExpandElement:!1,dataTreeStartExpanded:!1,dataTreeRowExpanded:function(){},dataTreeRowCollapsed:function(){},printAsHtml:!1,printFormatter:!1,printHeader:!1,printFooter:!1,printCopyStyle:!0,printVisibleRows:!0,printConfig:{},addRowPos:"bottom",selectable:"highlight",selectableRangeMode:"drag",selectableRollingSelection:!0,selectablePersistence:!0,selectableCheck:function(t,e){return!0},headerFilterPlaceholder:!1,headerVisible:!0,history:!1,locale:!1,langs:{},virtualDom:!0,virtualDomBuffer:0,persistentLayout:!1,persistentSort:!1,persistentFilter:!1,persistenceID:"",persistenceMode:!0,persistenceReaderFunc:!1,persistenceWriterFunc:!1,persistence:!1,responsiveLayout:!1,responsiveLayoutCollapseStartOpen:!0,responsiveLayoutCollapseUseFormatters:!0,responsiveLayoutCollapseFormatter:!1,pagination:!1,paginationSize:!1,paginationInitialPage:1,paginationButtonCount:5,paginationSizeSelector:!1,paginationElement:!1,paginationDataSent:{},paginationDataReceived:{},paginationAddRow:"page",ajaxURL:!1,ajaxURLGenerator:!1,ajaxParams:{},ajaxConfig:"get",ajaxContentType:"form",ajaxRequestFunc:!1,ajaxLoader:!0,ajaxLoaderLoading:!1,ajaxLoaderError:!1,ajaxFiltering:!1,ajaxSorting:!1,ajaxProgressiveLoad:!1,ajaxProgressiveLoadDelay:0,ajaxProgressiveLoadScrollMargin:0,groupBy:!1,groupStartOpen:!0,groupValues:!1,groupHeader:!1,htmlOutputConfig:!1,movableColumns:!1,movableRows:!1,movableRowsConnectedTables:!1,movableRowsSender:!1,movableRowsReceiver:"insert",movableRowsSendingStart:function(){},movableRowsSent:function(){},movableRowsSentFailed:function(){},movableRowsSendingStop:function(){},movableRowsReceivingStart:function(){},movableRowsReceived:function(){},movableRowsReceivedFailed:function(){},movableRowsReceivingStop:function(){},scrollToRowPosition:"top",scrollToRowIfVisible:!0,scrollToColumnPosition:"left",scrollToColumnIfVisible:!0,rowFormatter:!1,placeholder:!1,tableBuilding:function(){},tableBuilt:function(){},renderStarted:function(){},renderComplete:function(){},rowClick:!1,rowDblClick:!1,rowContext:!1,rowTap:!1,rowDblTap:!1,rowTapHold:!1,rowMouseEnter:!1,rowMouseLeave:!1,rowMouseOver:!1,rowMouseOut:!1,rowMouseMove:!1,rowAdded:function(){},rowDeleted:function(){},rowMoved:function(){},rowUpdated:function(){},rowSelectionChanged:function(){},rowSelected:function(){},rowDeselected:function(){},rowResized:function(){},cellClick:!1,cellDblClick:!1,cellContext:!1,cellTap:!1,cellDblTap:!1,cellTapHold:!1,cellMouseEnter:!1,cellMouseLeave:!1,cellMouseOver:!1,cellMouseOut:!1,cellMouseMove:!1,cellEditing:function(){},cellEdited:function(){},cellEditCancelled:function(){},columnMoved:!1,columnResized:function(){},columnTitleChanged:function(){},columnVisibilityChanged:function(){},htmlImporting:function(){},htmlImported:function(){},dataLoading:function(){},dataLoaded:function(){},dataEdited:function(){},ajaxRequesting:function(){},ajaxResponse:!1,ajaxError:function(){},dataFiltering:!1,dataFiltered:!1,dataSorting:function(){},dataSorted:function(){},groupToggleElement:"arrow",groupClosedShowCalcs:!1,dataGrouping:function(){},dataGrouped:!1,groupVisibilityChanged:function(){},groupClick:!1,groupDblClick:!1,groupContext:!1,groupTap:!1,groupDblTap:!1,groupTapHold:!1,columnCalcs:!0,pageLoaded:function(){},localized:function(){},validationFailed:function(){},historyUndo:function(){},historyRedo:function(){},scrollHorizontal:function(){},scrollVertical:function(){}},u.prototype.initializeOptions=function(t){if(!1!==t.invalidOptionWarnings)for(var e in t)void 0===this.defaultOptions[e]&&console.warn("Invalid table constructor option:",e);for(var e in this.defaultOptions)e in t?this.options[e]=t[e]:Array.isArray(this.defaultOptions[e])?this.options[e]=[]:"object"===_typeof(this.defaultOptions[e])?this.options[e]={}:this.options[e]=this.defaultOptions[e]},u.prototype.initializeElement=function(t){return"undefined"!=typeof HTMLElement&&t instanceof HTMLElement?(this.element=t,!0):"string"==typeof t?(this.element=document.querySelector(t),!!this.element||(console.error("Tabulator Creation Error - no element found matching selector: ",t),!1)):(console.error("Tabulator Creation Error - Invalid element provided:",t),!1)},u.prototype._mapDepricatedFunctionality=function(){(this.options.persistentLayout||this.options.persistentSort||this.options.persistentFilter)&&(this.options.persistence||(this.options.persistence={})),this.options.persistentLayout&&(console.warn("persistentLayout option is deprecated, you should now use the persistence option"),!0!==this.options.persistence&&void 0===this.options.persistence.columns&&(this.options.persistence.columns=!0)),this.options.persistentSort&&(console.warn("persistentSort option is deprecated, you should now use the persistence option"),!0!==this.options.persistence&&void 0===this.options.persistence.sort&&(this.options.persistence.sort=!0)),this.options.persistentFilter&&(console.warn("persistentFilter option is deprecated, you should now use the persistence option"),!0!==this.options.persistence&&void 0===this.options.persistence.filter&&(this.options.persistence.filter=!0)),this.options.columnVertAlign&&(console.warn("columnVertAlign option is deprecated, you should now use the columnHeaderVertAlign option"),this.options.columnHeaderVertAlign=this.options.columnVertAlign)},u.prototype._clearSelection=function(){this.element.classList.add("tabulator-block-select"),window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty(),this.element.classList.remove("tabulator-block-select")},u.prototype._create=function(){this._clearObjectPointers(),this._mapDepricatedFunctionality(),this.bindModules(),"TABLE"===this.element.tagName&&this.modExists("htmlTableImport",!0)&&this.modules.htmlTableImport.parseTable(),this.columnManager=new t(this),this.rowManager=new n(this),this.footerManager=new c(this),this.columnManager.setRowManager(this.rowManager),this.rowManager.setColumnManager(this.columnManager),this._buildElement(),this._loadInitialData()},u.prototype._clearObjectPointers=function(){this.options.columns=this.options.columns.slice(0),this.options.reactiveData||(this.options.data=this.options.data.slice(0))},u.prototype._buildElement=function(){var t=this,e=this.element,o=this.modules,i=this.options;for(i.tableBuilding.call(this),e.classList.add("tabulator"),e.setAttribute("role","grid");e.firstChild;)e.removeChild(e.firstChild);i.height&&(i.height=isNaN(i.height)?i.height:i.height+"px",e.style.height=i.height),this.columnManager.initialize(),this.rowManager.initialize(),this._detectBrowser(),this.modExists("layout",!0)&&o.layout.initialize(i.layout),!1!==i.headerFilterPlaceholder&&o.localize.setHeaderFilterPlaceholder(i.headerFilterPlaceholder);for(var n in i.langs)o.localize.installLang(n,i.langs[n]);if(o.localize.setLocale(i.locale),"string"==typeof i.placeholder){var s=document.createElement("div");s.classList.add("tabulator-placeholder");var r=document.createElement("span");r.innerHTML=i.placeholder,s.appendChild(r),i.placeholder=s}if(e.appendChild(this.columnManager.getElement()),e.appendChild(this.rowManager.getElement()),i.footerElement&&this.footerManager.activate(),i.persistence&&this.modExists("persistence",!0)&&o.persistence.initialize(),i.persistence&&this.modExists("persistence",!0)&&o.persistence.config.columns&&(i.columns=o.persistence.load("columns",i.columns)),i.movableRows&&this.modExists("moveRow")&&o.moveRow.initialize(),i.autoColumns&&this.options.data&&this.columnManager.generateColumnsFromRowData(this.options.data),this.modExists("columnCalcs")&&o.columnCalcs.initialize(),this.columnManager.setColumns(i.columns),i.dataTree&&this.modExists("dataTree",!0)&&o.dataTree.initialize(),this.modExists("frozenRows")&&this.modules.frozenRows.initialize(),(i.persistence&&this.modExists("persistence",!0)&&o.persistence.config.sort||i.initialSort)&&this.modExists("sort",!0)){var a=[];i.persistence&&this.modExists("persistence",!0)&&o.persistence.config.sort?!1===(a=o.persistence.load("sort"))&&i.initialSort&&(a=i.initialSort):i.initialSort&&(a=i.initialSort),o.sort.setSort(a)}if((i.persistence&&this.modExists("persistence",!0)&&o.persistence.config.filter||i.initialFilter)&&this.modExists("filter",!0)){var l=[];i.persistence&&this.modExists("persistence",!0)&&o.persistence.config.filter?!1===(l=o.persistence.load("filter"))&&i.initialFilter&&(l=i.initialFilter):i.initialFilter&&(l=i.initialFilter),o.filter.setFilter(l)}i.initialHeaderFilter&&this.modExists("filter",!0)&&i.initialHeaderFilter.forEach(function(e){var i=t.columnManager.findColumn(e.field);if(!i)return console.warn("Column Filter Error - No matching column found:",e.field),!1;o.filter.setHeaderFilterValue(i,e.value)}),this.modExists("ajax")&&o.ajax.initialize(),i.pagination&&this.modExists("page",!0)&&o.page.initialize(),i.groupBy&&this.modExists("groupRows",!0)&&o.groupRows.initialize(),this.modExists("keybindings")&&o.keybindings.initialize(),this.modExists("selectRow")&&o.selectRow.clearSelectionData(!0),i.autoResize&&this.modExists("resizeTable")&&o.resizeTable.initialize(),this.modExists("clipboard")&&o.clipboard.initialize(),i.printAsHtml&&this.modExists("print")&&o.print.initialize(),i.tableBuilt.call(this)},u.prototype._loadInitialData=function(){var t=this;if(t.options.pagination&&t.modExists("page"))if(t.modules.page.reset(!0),"local"==t.options.pagination){if(t.options.data.length)t.rowManager.setData(t.options.data);else{if((t.options.ajaxURL||t.options.ajaxURLGenerator)&&t.modExists("ajax"))return void t.modules.ajax.loadData().then(function(){}).catch(function(){t.options.paginationInitialPage&&t.modules.page.setPage(t.options.paginationInitialPage)});t.rowManager.setData(t.options.data)}t.options.paginationInitialPage&&t.modules.page.setPage(t.options.paginationInitialPage)}else t.options.ajaxURL?t.modules.page.setPage(t.options.paginationInitialPage).then(function(){}).catch(function(){}):t.rowManager.setData([]);else t.options.data.length?t.rowManager.setData(t.options.data):(t.options.ajaxURL||t.options.ajaxURLGenerator)&&t.modExists("ajax")?t.modules.ajax.loadData().then(function(){}).catch(function(){}):t.rowManager.setData(t.options.data)},u.prototype.destroy=function(){var t=this.element;for(u.prototype.comms.deregister(this),this.options.reactiveData&&this.modExists("reactiveData",!0)&&this.modules.reactiveData.unwatchData(),this.rowManager.rows.forEach(function(t){t.wipe()}),this.rowManager.rows=[],this.rowManager.activeRows=[],this.rowManager.displayRows=[],this.options.autoResize&&this.modExists("resizeTable")&&this.modules.resizeTable.clearBindings(),this.modExists("keybindings")&&this.modules.keybindings.clearBindings();t.firstChild;)t.removeChild(t.firstChild);t.classList.remove("tabulator")},u.prototype._detectBrowser=function(){var t=navigator.userAgent||navigator.vendor||window.opera;t.indexOf("Trident")>-1?(this.browser="ie",
this.browserSlow=!0):t.indexOf("Edge")>-1?(this.browser="edge",this.browserSlow=!0):t.indexOf("Firefox")>-1?(this.browser="firefox",this.browserSlow=!1):(this.browser="other",this.browserSlow=!1),this.browserMobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))},u.prototype.blockRedraw=function(){return this.rowManager.blockRedraw()},u.prototype.restoreRedraw=function(){return this.rowManager.restoreRedraw()},u.prototype.setDataFromLocalFile=function(t){var e=this;return new Promise(function(o,i){var n=document.createElement("input");n.type="file",n.accept=t||".json,application/json",n.addEventListener("change",function(t){var s,r=n.files[0],a=new FileReader;a.readAsText(r),a.onload=function(t){try{s=JSON.parse(a.result)}catch(t){return console.warn("File Load Error - File contents is invalid JSON",t),void i(t)}e._setData(s).then(function(t){o(t)}).catch(function(t){o(t)})},a.onerror=function(t){console.warn("File Load Error - Unable to read file"),i()}}),n.click()})},u.prototype.setData=function(t,e,o){return this.modExists("ajax")&&this.modules.ajax.blockActiveRequest(),this._setData(t,e,o)},u.prototype._setData=function(t,e,o,i){var n=this;return"string"!=typeof t?t?n.rowManager.setData(t,i):n.modExists("ajax")&&(n.modules.ajax.getUrl||n.options.ajaxURLGenerator)?"remote"==n.options.pagination&&n.modExists("page",!0)?(n.modules.page.reset(!0),n.modules.page.setPage(1)):n.modules.ajax.loadData(i):n.rowManager.setData([],i):0==t.indexOf("{")||0==t.indexOf("[")?n.rowManager.setData(JSON.parse(t),i):n.modExists("ajax",!0)?(e&&n.modules.ajax.setParams(e),o&&n.modules.ajax.setConfig(o),n.modules.ajax.setUrl(t),"remote"==n.options.pagination&&n.modExists("page",!0)?(n.modules.page.reset(!0),n.modules.page.setPage(1)):n.modules.ajax.loadData(i)):void 0},u.prototype.clearData=function(){this.modExists("ajax")&&this.modules.ajax.blockActiveRequest(),this.rowManager.clearData()},u.prototype.getData=function(t){return!0===t&&(console.warn("passing a boolean to the getData function is deprecated, you should now pass the string 'active'"),t="active"),this.rowManager.getData(t)},u.prototype.getDataCount=function(t){return!0===t&&(console.warn("passing a boolean to the getDataCount function is deprecated, you should now pass the string 'active'"),t="active"),this.rowManager.getDataCount(t)},u.prototype.searchRows=function(t,e,o){if(this.modExists("filter",!0))return this.modules.filter.search("rows",t,e,o)},u.prototype.searchData=function(t,e,o){if(this.modExists("filter",!0))return this.modules.filter.search("data",t,e,o)},u.prototype.getHtml=function(t,e,o){if(this.modExists("htmlTableExport",!0))return this.modules.htmlTableExport.getHtml(t,e,o)},u.prototype.print=function(t,e,o){if(this.modExists("print",!0))return this.modules.print.printFullscreen(t,e,o)},u.prototype.getAjaxUrl=function(){if(this.modExists("ajax",!0))return this.modules.ajax.getUrl()},u.prototype.replaceData=function(t,e,o){return this.modExists("ajax")&&this.modules.ajax.blockActiveRequest(),this._setData(t,e,o,!0)},u.prototype.updateData=function(t){var e=this,o=this,i=0;return new Promise(function(n,s){e.modExists("ajax")&&e.modules.ajax.blockActiveRequest(),"string"==typeof t&&(t=JSON.parse(t)),t?t.forEach(function(t){var e=o.rowManager.findRow(t[o.options.index]);e&&(i++,e.updateData(t).then(function(){--i||n()}))}):(console.warn("Update Error - No data provided"),s("Update Error - No data provided"))})},u.prototype.addData=function(t,e,o){var i=this;return new Promise(function(n,s){i.modExists("ajax")&&i.modules.ajax.blockActiveRequest(),"string"==typeof t&&(t=JSON.parse(t)),t?i.rowManager.addRows(t,e,o).then(function(t){var e=[];t.forEach(function(t){e.push(t.getComponent())}),n(e)}):(console.warn("Update Error - No data provided"),s("Update Error - No data provided"))})},u.prototype.updateOrAddData=function(t){var e=this,o=this,i=[],n=0;return new Promise(function(s,r){e.modExists("ajax")&&e.modules.ajax.blockActiveRequest(),"string"==typeof t&&(t=JSON.parse(t)),t?t.forEach(function(t){var e=o.rowManager.findRow(t[o.options.index]);n++,e?e.updateData(t).then(function(){n--,i.push(e.getComponent()),n||s(i)}):o.rowManager.addRows(t).then(function(t){n--,i.push(t[0].getComponent()),n||s(i)})}):(console.warn("Update Error - No data provided"),r("Update Error - No data provided"))})},u.prototype.getRow=function(t){var e=this.rowManager.findRow(t);return e?e.getComponent():(console.warn("Find Error - No matching row found:",t),!1)},u.prototype.getRowFromPosition=function(t,e){var o=this.rowManager.getRowFromPosition(t,e);return o?o.getComponent():(console.warn("Find Error - No matching row found:",t),!1)},u.prototype.deleteRow=function(t){var e=this;return new Promise(function(o,i){function n(){++s==t.length&&r&&(a.rowManager.reRenderInPosition(),o())}var s=0,r=0,a=e;Array.isArray(t)||(t=[t]),t.forEach(function(t){var o=e.rowManager.findRow(t,!0);o?o.delete().then(function(){r++,n()}).catch(function(t){n(),i(t)}):(console.warn("Delete Error - No matching row found:",t),i("Delete Error - No matching row found"),n())})})},u.prototype.addRow=function(t,e,o){var i=this;return new Promise(function(n,s){"string"==typeof t&&(t=JSON.parse(t)),i.rowManager.addRows(t,e,o).then(function(t){i.modExists("columnCalcs")&&i.modules.columnCalcs.recalc(i.rowManager.activeRows),n(t[0].getComponent())})})},u.prototype.updateOrAddRow=function(t,e){var o=this;return new Promise(function(i,n){var s=o.rowManager.findRow(t);"string"==typeof e&&(e=JSON.parse(e)),s?s.updateData(e).then(function(){o.modExists("columnCalcs")&&o.modules.columnCalcs.recalc(o.rowManager.activeRows),i(s.getComponent())}).catch(function(t){n(t)}):s=o.rowManager.addRows(e).then(function(t){o.modExists("columnCalcs")&&o.modules.columnCalcs.recalc(o.rowManager.activeRows),i(t[0].getComponent())}).catch(function(t){n(t)})})},u.prototype.updateRow=function(t,e){var o=this;return new Promise(function(i,n){var s=o.rowManager.findRow(t);"string"==typeof e&&(e=JSON.parse(e)),s?s.updateData(e).then(function(){i(s.getComponent())}).catch(function(t){n(t)}):(console.warn("Update Error - No matching row found:",t),n("Update Error - No matching row found"))})},u.prototype.scrollToRow=function(t,e,o){var i=this;return new Promise(function(n,s){var r=i.rowManager.findRow(t);r?i.rowManager.scrollToRow(r,e,o).then(function(){n()}).catch(function(t){s(t)}):(console.warn("Scroll Error - No matching row found:",t),s("Scroll Error - No matching row found"))})},u.prototype.moveRow=function(t,e,o){var i=this.rowManager.findRow(t);i?i.moveToRow(e,o):console.warn("Move Error - No matching row found:",t)},u.prototype.getRows=function(t){return!0===t&&(console.warn("passing a boolean to the getRows function is deprecated, you should now pass the string 'active'"),t="active"),this.rowManager.getComponents(t)},u.prototype.getRowPosition=function(t,e){var o=this.rowManager.findRow(t);return o?this.rowManager.getRowPosition(o,e):(console.warn("Position Error - No matching row found:",t),!1)},u.prototype.copyToClipboard=function(t,e,o,i){this.modExists("clipboard",!0)&&this.modules.clipboard.copy(t,e,o,i)},u.prototype.setColumns=function(t){this.columnManager.setColumns(t)},u.prototype.getColumns=function(t){return this.columnManager.getComponents(t)},u.prototype.getColumn=function(t){var e=this.columnManager.findColumn(t);return e?e.getComponent():(console.warn("Find Error - No matching column found:",t),!1)},u.prototype.getColumnDefinitions=function(){return this.columnManager.getDefinitionTree()},u.prototype.getColumnLayout=function(){if(this.modExists("persistence",!0))return this.modules.persistence.parseColumns(this.columnManager.getColumns())},u.prototype.setColumnLayout=function(t){return!!this.modExists("persistence",!0)&&(this.columnManager.setColumns(this.modules.persistence.mergeDefinition(this.options.columns,t)),!0)},u.prototype.showColumn=function(t){var e=this.columnManager.findColumn(t);if(!e)return console.warn("Column Show Error - No matching column found:",t),!1;e.show(),this.options.responsiveLayout&&this.modExists("responsiveLayout",!0)&&this.modules.responsiveLayout.update()},u.prototype.hideColumn=function(t){var e=this.columnManager.findColumn(t);if(!e)return console.warn("Column Hide Error - No matching column found:",t),!1;e.hide(),this.options.responsiveLayout&&this.modExists("responsiveLayout",!0)&&this.modules.responsiveLayout.update()},u.prototype.toggleColumn=function(t){var e=this.columnManager.findColumn(t);if(!e)return console.warn("Column Visibility Toggle Error - No matching column found:",t),!1;e.visible?e.hide():e.show()},u.prototype.addColumn=function(t,e,o){var i=this;return new Promise(function(n,s){var r=i.columnManager.findColumn(o);i.columnManager.addColumn(t,e,r).then(function(t){n(t.getComponent())}).catch(function(t){s(t)})})},u.prototype.deleteColumn=function(t){var e=this;return new Promise(function(o,i){var n=e.columnManager.findColumn(t);n?n.delete().then(function(){o()}).catch(function(t){i(t)}):(console.warn("Column Delete Error - No matching column found:",t),i())})},u.prototype.updateColumnDefinition=function(t,e){var o=this;return new Promise(function(e,i){var n=o.columnManager.findColumn(t);n?n.updateDefinition().then(function(t){e(t)}).catch(function(t){i(t)}):(console.warn("Column Update Error - No matching column found:",t),i())})},u.prototype.moveColumn=function(t,e,o){var i=this.columnManager.findColumn(t),n=this.columnManager.findColumn(e);i?n?this.columnManager.moveColumn(i,n,o):console.warn("Move Error - No matching column found:",n):console.warn("Move Error - No matching column found:",t)},u.prototype.scrollToColumn=function(t,e,o){var i=this;return new Promise(function(n,s){var r=i.columnManager.findColumn(t);r?i.columnManager.scrollToColumn(r,e,o).then(function(){n()}).catch(function(t){s(t)}):(console.warn("Scroll Error - No matching column found:",t),s("Scroll Error - No matching column found"))})},u.prototype.setLocale=function(t){this.modules.localize.setLocale(t)},u.prototype.getLocale=function(){return this.modules.localize.getLocale()},u.prototype.getLang=function(t){return this.modules.localize.getLang(t)},u.prototype.redraw=function(t){this.columnManager.redraw(t),this.rowManager.redraw(t)},u.prototype.setHeight=function(t){"classic"!==this.rowManager.renderMode?(this.options.height=isNaN(t)?t:t+"px",this.element.style.height=this.options.height,this.rowManager.redraw()):console.warn("setHeight function is not available in classic render mode")},u.prototype.setSort=function(t,e){this.modExists("sort",!0)&&(this.modules.sort.setSort(t,e),this.rowManager.sorterRefresh())},u.prototype.getSorters=function(){if(this.modExists("sort",!0))return this.modules.sort.getSort()},u.prototype.clearSort=function(){this.modExists("sort",!0)&&(this.modules.sort.clear(),this.rowManager.sorterRefresh())},u.prototype.setFilter=function(t,e,o){this.modExists("filter",!0)&&(this.modules.filter.setFilter(t,e,o),this.rowManager.filterRefresh())},u.prototype.addFilter=function(t,e,o){this.modExists("filter",!0)&&(this.modules.filter.addFilter(t,e,o),this.rowManager.filterRefresh())},u.prototype.getFilters=function(t){if(this.modExists("filter",!0))return this.modules.filter.getFilters(t)},u.prototype.setHeaderFilterFocus=function(t){if(this.modExists("filter",!0)){var e=this.columnManager.findColumn(t);if(!e)return console.warn("Column Filter Focus Error - No matching column found:",t),!1;this.modules.filter.setHeaderFilterFocus(e)}},u.prototype.setHeaderFilterValue=function(t,e){if(this.modExists("filter",!0)){var o=this.columnManager.findColumn(t);if(!o)return console.warn("Column Filter Error - No matching column found:",t),!1;this.modules.filter.setHeaderFilterValue(o,e)}},u.prototype.getHeaderFilters=function(){if(this.modExists("filter",!0))return this.modules.filter.getHeaderFilters()},u.prototype.removeFilter=function(t,e,o){this.modExists("filter",!0)&&(this.modules.filter.removeFilter(t,e,o),this.rowManager.filterRefresh())},u.prototype.clearFilter=function(t){this.modExists("filter",!0)&&(this.modules.filter.clearFilter(t),this.rowManager.filterRefresh())},u.prototype.clearHeaderFilter=function(){this.modExists("filter",!0)&&(this.modules.filter.clearHeaderFilter(),this.rowManager.filterRefresh())},u.prototype.selectRow=function(t){this.modExists("selectRow",!0)&&(!0===t&&(console.warn("passing a boolean to the selectRowselectRow function is deprecated, you should now pass the string 'active'"),t="active"),this.modules.selectRow.selectRows(t))},u.prototype.deselectRow=function(t){this.modExists("selectRow",!0)&&this.modules.selectRow.deselectRows(t)},u.prototype.toggleSelectRow=function(t){this.modExists("selectRow",!0)&&this.modules.selectRow.toggleRow(t)},u.prototype.getSelectedRows=function(){if(this.modExists("selectRow",!0))return this.modules.selectRow.getSelectedRows()},u.prototype.getSelectedData=function(){if(this.modExists("selectRow",!0))return this.modules.selectRow.getSelectedData()},u.prototype.setMaxPage=function(t){if(!this.options.pagination||!this.modExists("page"))return!1;this.modules.page.setMaxPage(t)},u.prototype.setPage=function(t){return this.options.pagination&&this.modExists("page")?this.modules.page.setPage(t):new Promise(function(t,e){e()})},u.prototype.setPageToRow=function(t){var e=this;return new Promise(function(o,i){e.options.pagination&&e.modExists("page")?(t=e.rowManager.findRow(t),t?e.modules.page.setPageToRow(t).then(function(){o()}).catch(function(){i()}):i()):i()})},u.prototype.setPageSize=function(t){if(!this.options.pagination||!this.modExists("page"))return!1;this.modules.page.setPageSize(t),this.modules.page.setPage(1).then(function(){}).catch(function(){})},u.prototype.getPageSize=function(){if(this.options.pagination&&this.modExists("page",!0))return this.modules.page.getPageSize()},u.prototype.previousPage=function(){if(!this.options.pagination||!this.modExists("page"))return!1;this.modules.page.previousPage()},u.prototype.nextPage=function(){if(!this.options.pagination||!this.modExists("page"))return!1;this.modules.page.nextPage()},u.prototype.getPage=function(){return!(!this.options.pagination||!this.modExists("page"))&&this.modules.page.getPage()},u.prototype.getPageMax=function(){return!(!this.options.pagination||!this.modExists("page"))&&this.modules.page.getPageMax()},u.prototype.setGroupBy=function(t){if(!this.modExists("groupRows",!0))return!1;this.options.groupBy=t,this.modules.groupRows.initialize(),this.rowManager.refreshActiveData("display"),this.options.persistence&&this.modExists("persistence",!0)&&this.modules.persistence.config.group&&this.modules.persistence.save("group")},u.prototype.setGroupStartOpen=function(t){if(!this.modExists("groupRows",!0))return!1;this.options.groupStartOpen=t,this.modules.groupRows.initialize(),this.options.groupBy?(this.rowManager.refreshActiveData("group"),this.options.persistence&&this.modExists("persistence",!0)&&this.modules.persistence.config.group&&this.modules.persistence.save("group")):console.warn("Grouping Update - cant refresh view, no groups have been set")},u.prototype.setGroupHeader=function(t){if(!this.modExists("groupRows",!0))return!1;this.options.groupHeader=t,this.modules.groupRows.initialize(),this.options.groupBy?(this.rowManager.refreshActiveData("group"),this.options.persistence&&this.modExists("persistence",!0)&&this.modules.persistence.config.group&&this.modules.persistence.save("group")):console.warn("Grouping Update - cant refresh view, no groups have been set")},u.prototype.getGroups=function(t){return!!this.modExists("groupRows",!0)&&this.modules.groupRows.getGroups(!0)},u.prototype.getGroupedData=function(){if(this.modExists("groupRows",!0))return this.options.groupBy?this.modules.groupRows.getGroupedData():this.getData()},u.prototype.getCalcResults=function(){return!!this.modExists("columnCalcs",!0)&&this.modules.columnCalcs.getResults()},u.prototype.navigatePrev=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&t.nav().prev()},u.prototype.navigateNext=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&t.nav().next()},u.prototype.navigateLeft=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&(e.preventDefault(),t.nav().left())},u.prototype.navigateRight=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&(e.preventDefault(),t.nav().right())},u.prototype.navigateUp=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&(e.preventDefault(),t.nav().up())},u.prototype.navigateDown=function(){var t=!1;return!(!this.modExists("edit",!0)||!(t=this.modules.edit.currentCell))&&(e.preventDefault(),t.nav().down())},u.prototype.undo=function(){return!(!this.options.history||!this.modExists("history",!0))&&this.modules.history.undo()},u.prototype.redo=function(){return!(!this.options.history||!this.modExists("history",!0))&&this.modules.history.redo()},u.prototype.getHistoryUndoSize=function(){return!(!this.options.history||!this.modExists("history",!0))&&this.modules.history.getHistoryUndoSize()},u.prototype.getHistoryRedoSize=function(){return!(!this.options.history||!this.modExists("history",!0))&&this.modules.history.getHistoryRedoSize()},u.prototype.download=function(t,e,o,i){this.modExists("download",!0)&&this.modules.download.download(t,e,o,i)},u.prototype.downloadToTab=function(t,e,o,i){this.modExists("download",!0)&&this.modules.download.download(t,e,o,i,!0)},u.prototype.tableComms=function(t,e,o,i){this.modules.comms.receive(t,e,o,i)},u.prototype.moduleBindings={},u.prototype.extendModule=function(t,e,o){if(u.prototype.moduleBindings[t]){var i=u.prototype.moduleBindings[t].prototype[e];if(i)if("object"==(void 0===o?"undefined":_typeof(o)))for(var n in o)i[n]=o[n];else console.warn("Module Error - Invalid value type, it must be an object");else console.warn("Module Error - property does not exist:",e)}else console.warn("Module Error - module does not exist:",t)},u.prototype.registerModule=function(t,e){u.prototype.moduleBindings[t]=e},u.prototype.bindModules=function(){this.modules={};for(var t in u.prototype.moduleBindings)this.modules[t]=new u.prototype.moduleBindings[t](this)},u.prototype.modExists=function(t,e){return!!this.modules[t]||(e&&console.error("Tabulator Module Not Installed: "+t),!1)},u.prototype.helpers={elVisible:function(t){return!(t.offsetWidth<=0&&t.offsetHeight<=0)},elOffset:function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset-document.documentElement.clientTop,left:e.left+window.pageXOffset-document.documentElement.clientLeft}},deepClone:function(t){var e=Array.isArray(t)?[]:{};for(var o in t)null!=t[o]&&"object"===_typeof(t[o])?t[o]instanceof Date?e[o]=new Date(t[o]):e[o]=this.deepClone(t[o]):e[o]=t[o];return e}},u.prototype.comms={tables:[],register:function(t){u.prototype.comms.tables.push(t)},deregister:function(t){var e=u.prototype.comms.tables.indexOf(t);e>-1&&u.prototype.comms.tables.splice(e,1)},lookupTable:function(t,e){var o,i,n=[];if("string"==typeof t){if(o=document.querySelectorAll(t),o.length)for(var s=0;s<o.length;s++)(i=u.prototype.comms.matchElement(o[s]))&&n.push(i)}else"undefined"!=typeof HTMLElement&&t instanceof HTMLElement||t instanceof u?(i=u.prototype.comms.matchElement(t))&&n.push(i):Array.isArray(t)?t.forEach(function(t){n=n.concat(u.prototype.comms.lookupTable(t))}):e||console.warn("Table Connection Error - Invalid Selector",t);return n},matchElement:function(t){return u.prototype.comms.tables.find(function(e){return t instanceof u?e===t:e.element===t})}},u.prototype.findTable=function(t){var e=u.prototype.comms.lookupTable(t,!0);return!(Array.isArray(e)&&!e.length)&&e};var d=function(t){this.table=t,this.mode=null};d.prototype.initialize=function(t){this.modes[t]?this.mode=t:(console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : "+t),this.mode="fitData"),this.table.element.setAttribute("tabulator-layout",this.mode)},d.prototype.getMode=function(){return this.mode},d.prototype.layout=function(){this.modes[this.mode].call(this,this.table.columnManager.columnsByIndex)},d.prototype.modes={fitData:function(t){t.forEach(function(t){t.reinitializeWidth()}),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.update()},fitDataFill:function(t){t.forEach(function(t){t.reinitializeWidth()}),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.update()},fitDataStretch:function(t){var e=this,o=0,i=this.table.rowManager.element.clientWidth,n=0,s=!1;t.forEach(function(t,i){t.widthFixed||t.reinitializeWidth(),(e.table.options.responsiveLayout?t.modules.responsive.visible:t.visible)&&(s=t),t.visible&&(o+=t.getWidth())}),s?(n=i-o+s.getWidth(),this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&(s.setWidth(0),this.table.modules.responsiveLayout.update()),n>0?s.setWidth(n):s.reinitializeWidth()):this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.update()},fitColumns:function(t){function e(t){return"string"==typeof t?t.indexOf("%")>-1?n/100*parseInt(t):parseInt(t):t}function o(t,i,n,s){function r(t){return n*(t.column.definition.widthGrow||1)}function a(t){return e(t.width)-n*(t.column.definition.widthShrink||0)}var l=[],c=0,u=0,d=0,h=0,p=0,m=[];return t.forEach(function(t,e){var o=s?a(t):r(t);t.column.minWidth>=o?l.push(t):(m.push(t),p+=s?t.column.definition.widthShrink||1:t.column.definition.widthGrow||1)}),l.length?(l.forEach(function(t){c+=s?t.width-t.column.minWidth:t.column.minWidth,t.width=t.column.minWidth}),u=i-c,d=p?Math.floor(u/p):u,h=u-d*p,h+=o(m,u,d,s)):(h=p?i-Math.floor(i/p)*p:i,m.forEach(function(t){t.width=s?a(t):r(t)})),h}var i=this,n=i.table.element.clientWidth,s=0,r=0,a=0,l=0,c=[],u=[],d=0,h=0,p=0;this.table.options.responsiveLayout&&this.table.modExists("responsiveLayout",!0)&&this.table.modules.responsiveLayout.update(),this.table.rowManager.element.scrollHeight>this.table.rowManager.element.clientHeight&&(n-=this.table.rowManager.element.offsetWidth-this.table.rowManager.element.clientWidth),t.forEach(function(t){var o,i,n;t.visible&&(o=t.definition.width,i=parseInt(t.minWidth),o?(n=e(o),s+=n>i?n:i,t.definition.widthShrink&&(u.push({column:t,width:n>i?n:i}),d+=t.definition.widthShrink)):(c.push({column:t,width:0}),a+=t.definition.widthGrow||1))}),r=n-s,l=Math.floor(r/a);var p=o(c,r,l,!1);c.length&&p>0&&(c[c.length-1].width+=+p),c.forEach(function(t){r-=t.width}),h=Math.abs(p)+r,h>0&&d&&(p=o(u,h,Math.floor(h/d),!0)),u.length&&(u[u.length-1].width-=p),c.forEach(function(t){t.column.setWidth(t.width)}),u.forEach(function(t){t.column.setWidth(t.width)})}},u.prototype.registerModule("layout",d);var h=function(t){this.table=t,this.locale="default",this.lang=!1,this.bindings={}};h.prototype.setHeaderFilterPlaceholder=function(t){this.langs.default.headerFilters.default=t},h.prototype.setHeaderFilterColumnPlaceholder=function(t,e){this.langs.default.headerFilters.columns[t]=e,this.lang&&!this.lang.headerFilters.columns[t]&&(this.lang.headerFilters.columns[t]=e)},h.prototype.installLang=function(t,e){this.langs[t]?this._setLangProp(this.langs[t],e):this.langs[t]=e},h.prototype._setLangProp=function(t,e){for(var o in e)t[o]&&"object"==_typeof(t[o])?this._setLangProp(t[o],e[o]):t[o]=e[o]},h.prototype.setLocale=function(t){function e(t,o){for(var i in t)"object"==_typeof(t[i])?(o[i]||(o[i]={}),e(t[i],o[i])):o[i]=t[i]}var o=this;if(t=t||"default",!0===t&&navigator.language&&(t=navigator.language.toLowerCase()),t&&!o.langs[t]){var i=t.split("-")[0];o.langs[i]?(console.warn("Localization Error - Exact matching locale not found, using closest match: ",t,i),t=i):(console.warn("Localization Error - Matching locale not found, using default: ",t),t="default")}o.locale=t,o.lang=u.prototype.helpers.deepClone(o.langs.default||{}),"default"!=t&&e(o.langs[t],o.lang),o.table.options.localized.call(o.table,o.locale,o.lang),o._executeBindings()},h.prototype.getLocale=function(t){return self.locale},h.prototype.getLang=function(t){return t?this.langs[t]:this.lang},h.prototype.getText=function(t,e){var t=e?t+"|"+e:t,o=t.split("|");return this._getLangElement(o,this.locale)||""},h.prototype._getLangElement=function(t,e){var o=this,i=o.lang;return t.forEach(function(t){var e;i&&(e=i[t],i=void 0!==e&&e)}),i},h.prototype.bind=function(t,e){this.bindings[t]||(this.bindings[t]=[]),this.bindings[t].push(e),e(this.getText(t),this.lang)},h.prototype._executeBindings=function(){var t=this;for(var e in t.bindings)!function(e){t.bindings[e].forEach(function(o){o(t.getText(e),t.lang)})}(e)},h.prototype.langs={default:{groups:{item:"item",items:"items"},columns:{},ajax:{loading:"Loading",error:"Error"},pagination:{page_size:"Page Size",first:"First",first_title:"First Page",last:"Last",last_title:"Last Page",prev:"Prev",prev_title:"Prev Page",next:"Next",next_title:"Next Page"},headerFilters:{default:"filter column...",columns:{}}}},u.prototype.registerModule("localize",h);var p=function(t){this.table=t};p.prototype.getConnections=function(t){var e,o=this,i=[];return e=u.prototype.comms.lookupTable(t),e.forEach(function(t){o.table!==t&&i.push(t)}),i},p.prototype.send=function(t,e,o,i){var n=this,s=this.getConnections(t);s.forEach(function(t){t.tableComms(n.table.element,e,o,i)}),!s.length&&t&&console.warn("Table Connection Error - No tables matching selector found",t)},p.prototype.receive=function(t,e,o,i){if(this.table.modExists(e))return this.table.modules[e].commsReceived(t,o,i);console.warn("Inter-table Comms Error - no such module:",e)},u.prototype.registerModule("comms",p);var m=function(t){this.table=t,this.allowedTypes=["","data","download","clipboard"]};m.prototype.initializeColumn=function(t){var e=this,o=!1,i={};this.allowedTypes.forEach(function(n){var s,r="accessor"+(n.charAt(0).toUpperCase()+n.slice(1));t.definition[r]&&(s=e.lookupAccessor(t.definition[r]))&&(o=!0,i[r]={accessor:s,params:t.definition[r+"Params"]||{}})}),o&&(t.modules.accessor=i)},m.prototype.lookupAccessor=function(t){var e=!1;switch(void 0===t?"undefined":_typeof(t)){case"string":this.accessors[t]?e=this.accessors[t]:console.warn("Accessor Error - No such accessor found, ignoring: ",t);break;case"function":e=t}return e},m.prototype.transformRow=function(t,e){var o=this,i="accessor"+(e.charAt(0).toUpperCase()+e.slice(1)),n=u.prototype.helpers.deepClone(t||{});return o.table.columnManager.traverse(function(t){var o,s,r,a;t.modules.accessor&&(s=t.modules.accessor[i]||t.modules.accessor.accessor||!1)&&"undefined"!=(o=t.getFieldValue(n))&&(a=t.getComponent(),r="function"==typeof s.params?s.params(o,n,e,a):s.params,t.setFieldValue(n,s.accessor(o,n,e,r,a)))}),n},m.prototype.accessors={},u.prototype.registerModule("accessor",m);var f=function(t){this.table=t,this.config=!1,this.url="",this.urlGenerator=!1,this.params=!1,this.loaderElement=this.createLoaderElement(),this.msgElement=this.createMsgElement(),this.loadingElement=!1,this.errorElement=!1,this.loaderPromise=!1,this.progressiveLoad=!1,this.loading=!1,this.requestOrder=0};f.prototype.initialize=function(){var t;this.loaderElement.appendChild(this.msgElement),this.table.options.ajaxLoaderLoading&&("string"==typeof this.table.options.ajaxLoaderLoading?(t=document.createElement("template"),t.innerHTML=this.table.options.ajaxLoaderLoading.trim(),this.loadingElement=t.content.firstChild):this.loadingElement=this.table.options.ajaxLoaderLoading),this.loaderPromise=this.table.options.ajaxRequestFunc||this.defaultLoaderPromise,this.urlGenerator=this.table.options.ajaxURLGenerator||this.defaultURLGenerator,this.table.options.ajaxLoaderError&&("string"==typeof this.table.options.ajaxLoaderError?(t=document.createElement("template"),t.innerHTML=this.table.options.ajaxLoaderError.trim(),this.errorElement=t.content.firstChild):this.errorElement=this.table.options.ajaxLoaderError),this.table.options.ajaxParams&&this.setParams(this.table.options.ajaxParams),this.table.options.ajaxConfig&&this.setConfig(this.table.options.ajaxConfig),this.table.options.ajaxURL&&this.setUrl(this.table.options.ajaxURL),this.table.options.ajaxProgressiveLoad&&(this.table.options.pagination?(this.progressiveLoad=!1,console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time")):this.table.modExists("page")?(this.progressiveLoad=this.table.options.ajaxProgressiveLoad,this.table.modules.page.initializeProgressive(this.progressiveLoad)):console.error("Pagination plugin is required for progressive ajax loading"))},f.prototype.createLoaderElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-loader"),t},f.prototype.createMsgElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-loader-msg"),t.setAttribute("role","alert"),t},f.prototype.setParams=function(t,e){if(e){this.params=this.params||{};for(var o in t)this.params[o]=t[o]}else this.params=t},f.prototype.getParams=function(){return this.params||{}},f.prototype.setConfig=function(t){if(this._loadDefaultConfig(),"string"==typeof t)this.config.method=t;else for(var e in t)this.config[e]=t[e]},f.prototype._loadDefaultConfig=function(t){var e=this;if(!e.config||t){e.config={};for(var o in e.defaultConfig)e.config[o]=e.defaultConfig[o]}},f.prototype.setUrl=function(t){this.url=t},f.prototype.getUrl=function(){return this.url},f.prototype.loadData=function(t){return this.progressiveLoad?this._loadDataProgressive():this._loadDataStandard(t)},f.prototype.nextPage=function(t){var e;this.loading||(e=this.table.options.ajaxProgressiveLoadScrollMargin||2*this.table.rowManager.getElement().clientHeight,t<e&&this.table.modules.page.nextPage().then(function(){}).catch(function(){}))},f.prototype.blockActiveRequest=function(){this.requestOrder++},f.prototype._loadDataProgressive=function(){
return this.table.rowManager.setData([]),this.table.modules.page.setPage(1)},f.prototype._loadDataStandard=function(t){var e=this;return new Promise(function(o,i){e.sendRequest(t).then(function(n){e.table.rowManager.setData(n,t).then(function(){o()}).catch(function(t){i(t)})}).catch(function(t){i(t)})})},f.prototype.generateParamsList=function(t,e){var o=this,i=[];if(e=e||"",Array.isArray(t))t.forEach(function(t,n){i=i.concat(o.generateParamsList(t,e?e+"["+n+"]":n))});else if("object"===(void 0===t?"undefined":_typeof(t)))for(var n in t)i=i.concat(o.generateParamsList(t[n],e?e+"["+n+"]":n));else i.push({key:e,value:t});return i},f.prototype.serializeParams=function(t){var e=this.generateParamsList(t),o=[];return e.forEach(function(t){o.push(encodeURIComponent(t.key)+"="+encodeURIComponent(t.value))}),o.join("&")},f.prototype.sendRequest=function(t){var e,o=this,i=this,n=i.url;return i.requestOrder++,e=i.requestOrder,i._loadDefaultConfig(),new Promise(function(s,r){!1!==i.table.options.ajaxRequesting.call(o.table,i.url,i.params)?(i.loading=!0,t||i.showLoader(),o.loaderPromise(n,i.config,i.params).then(function(t){e===i.requestOrder?(i.table.options.ajaxResponse&&(t=i.table.options.ajaxResponse.call(i.table,i.url,i.params,t)),s(t)):console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made"),i.hideLoader(),i.loading=!1}).catch(function(t){console.error("Ajax Load Error: ",t),i.table.options.ajaxError.call(i.table,t),i.showError(),setTimeout(function(){i.hideLoader()},3e3),i.loading=!1,r()})):r()})},f.prototype.showLoader=function(){if("function"==typeof this.table.options.ajaxLoader?this.table.options.ajaxLoader():this.table.options.ajaxLoader){for(this.hideLoader();this.msgElement.firstChild;)this.msgElement.removeChild(this.msgElement.firstChild);this.msgElement.classList.remove("tabulator-error"),this.msgElement.classList.add("tabulator-loading"),this.loadingElement?this.msgElement.appendChild(this.loadingElement):this.msgElement.innerHTML=this.table.modules.localize.getText("ajax|loading"),this.table.element.appendChild(this.loaderElement)}},f.prototype.showError=function(){for(this.hideLoader();this.msgElement.firstChild;)this.msgElement.removeChild(this.msgElement.firstChild);this.msgElement.classList.remove("tabulator-loading"),this.msgElement.classList.add("tabulator-error"),this.errorElement?this.msgElement.appendChild(this.errorElement):this.msgElement.innerHTML=this.table.modules.localize.getText("ajax|error"),this.table.element.appendChild(this.loaderElement)},f.prototype.hideLoader=function(){this.loaderElement.parentNode&&this.loaderElement.parentNode.removeChild(this.loaderElement)},f.prototype.defaultConfig={method:"GET"},f.prototype.defaultURLGenerator=function(t,e,o){return t&&o&&Object.keys(o).length&&(e.method&&"get"!=e.method.toLowerCase()||(e.method="get",t+=(t.includes("?")?"&":"?")+this.serializeParams(o))),t},f.prototype.defaultLoaderPromise=function(t,e,o){var i,n=this;return new Promise(function(s,r){if(t=n.urlGenerator(t,e,o),"GET"!=e.method.toUpperCase())if(i="object"===_typeof(n.table.options.ajaxContentType)?n.table.options.ajaxContentType:n.contentTypeFormatters[n.table.options.ajaxContentType]){for(var a in i.headers)e.headers||(e.headers={}),void 0===e.headers[a]&&(e.headers[a]=i.headers[a]);e.body=i.body.call(n,t,e,o)}else console.warn("Ajax Error - Invalid ajaxContentType value:",n.table.options.ajaxContentType);t?(void 0===e.headers&&(e.headers={}),void 0===e.headers.Accept&&(e.headers.Accept="application/json"),void 0===e.headers["X-Requested-With"]&&(e.headers["X-Requested-With"]="XMLHttpRequest"),void 0===e.mode&&(e.mode="cors"),"cors"==e.mode?(void 0===e.headers["Access-Control-Allow-Origin"]&&(e.headers["Access-Control-Allow-Origin"]=window.location.origin),void 0===e.credentials&&(e.credentials="same-origin")):void 0===e.credentials&&(e.credentials="include"),fetch(t,e).then(function(t){t.ok?t.json().then(function(t){s(t)}).catch(function(t){r(t),console.warn("Ajax Load Error - Invalid JSON returned",t)}):(console.error("Ajax Load Error - Connection Error: "+t.status,t.statusText),r(t))}).catch(function(t){console.error("Ajax Load Error - Connection Error: ",t),r(t)})):(console.warn("Ajax Load Error - No URL Set"),s([]))})},f.prototype.contentTypeFormatters={json:{headers:{"Content-Type":"application/json"},body:function(t,e,o){return JSON.stringify(o)}},form:{headers:{},body:function(t,e,o){var i=this.generateParamsList(o),n=new FormData;return i.forEach(function(t){n.append(t.key,t.value)}),n}}},u.prototype.registerModule("ajax",f);var g=function(t){this.table=t,this.topCalcs=[],this.botCalcs=[],this.genColumn=!1,this.topElement=this.createElement(),this.botElement=this.createElement(),this.topRow=!1,this.botRow=!1,this.topInitialized=!1,this.botInitialized=!1,this.initialize()};g.prototype.createElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-calcs-holder"),t},g.prototype.initialize=function(){this.genColumn=new i({field:"value"},this)},g.prototype.registerColumnField=function(){},g.prototype.initializeColumn=function(t){var e=t.definition,o={topCalcParams:e.topCalcParams||{},botCalcParams:e.bottomCalcParams||{}};if(e.topCalc){switch(_typeof(e.topCalc)){case"string":this.calculations[e.topCalc]?o.topCalc=this.calculations[e.topCalc]:console.warn("Column Calc Error - No such calculation found, ignoring: ",e.topCalc);break;case"function":o.topCalc=e.topCalc}o.topCalc&&(t.modules.columnCalcs=o,this.topCalcs.push(t),"group"!=this.table.options.columnCalcs&&this.initializeTopRow())}if(e.bottomCalc){switch(_typeof(e.bottomCalc)){case"string":this.calculations[e.bottomCalc]?o.botCalc=this.calculations[e.bottomCalc]:console.warn("Column Calc Error - No such calculation found, ignoring: ",e.bottomCalc);break;case"function":o.botCalc=e.bottomCalc}o.botCalc&&(t.modules.columnCalcs=o,this.botCalcs.push(t),"group"!=this.table.options.columnCalcs&&this.initializeBottomRow())}},g.prototype.removeCalcs=function(){var t=!1;this.topInitialized&&(this.topInitialized=!1,this.topElement.parentNode.removeChild(this.topElement),t=!0),this.botInitialized&&(this.botInitialized=!1,this.table.footerManager.remove(this.botElement),t=!0),t&&this.table.rowManager.adjustTableSize()},g.prototype.initializeTopRow=function(){this.topInitialized||(this.table.columnManager.getElement().insertBefore(this.topElement,this.table.columnManager.headersElement.nextSibling),this.topInitialized=!0)},g.prototype.initializeBottomRow=function(){this.botInitialized||(this.table.footerManager.prepend(this.botElement),this.botInitialized=!0)},g.prototype.scrollHorizontal=function(t){this.table.columnManager.getElement().scrollWidth,this.table.element.clientWidth;this.botInitialized&&(this.botRow.getElement().style.marginLeft=-t+"px")},g.prototype.recalc=function(t){var e;if(this.topInitialized||this.botInitialized){if(this.rowsToData(t),this.topInitialized){for(this.topRow&&this.topRow.deleteCells(),e=this.generateRow("top",this.rowsToData(t)),this.topRow=e;this.topElement.firstChild;)this.topElement.removeChild(this.topElement.firstChild);this.topElement.appendChild(e.getElement()),e.initialize(!0)}if(this.botInitialized){for(this.botRow&&this.botRow.deleteCells(),e=this.generateRow("bottom",this.rowsToData(t)),this.botRow=e;this.botElement.firstChild;)this.botElement.removeChild(this.botElement.firstChild);this.botElement.appendChild(e.getElement()),e.initialize(!0)}this.table.rowManager.adjustTableSize(),this.table.modExists("frozenColumns")&&this.table.modules.frozenColumns.layout()}},g.prototype.recalcRowGroup=function(t){this.recalcGroup(this.table.modules.groupRows.getRowGroup(t))},g.prototype.recalcGroup=function(t){var e,o;t&&t.calcs&&(t.calcs.bottom&&(e=this.rowsToData(t.rows),o=this.generateRowData("bottom",e),t.calcs.bottom.updateData(o),t.calcs.bottom.reinitialize()),t.calcs.top&&(e=this.rowsToData(t.rows),o=this.generateRowData("top",e),t.calcs.top.updateData(o),t.calcs.top.reinitialize()))},g.prototype.generateTopRow=function(t){return this.generateRow("top",this.rowsToData(t))},g.prototype.generateBottomRow=function(t){return this.generateRow("bottom",this.rowsToData(t))},g.prototype.rowsToData=function(t){var e=[];return t.forEach(function(t){e.push(t.getData())}),e},g.prototype.generateRow=function(t,e){var o,i=this,n=this.generateRowData(t,e);return i.table.modExists("mutator")&&i.table.modules.mutator.disable(),o=new r(n,this,"calc"),i.table.modExists("mutator")&&i.table.modules.mutator.enable(),o.getElement().classList.add("tabulator-calcs","tabulator-calcs-"+t),o.generateCells=function(){var e=[];i.table.columnManager.columnsByIndex.forEach(function(n){i.genColumn.setField(n.getField()),i.genColumn.hozAlign=n.hozAlign,n.definition[t+"CalcFormatter"]&&i.table.modExists("format")?i.genColumn.modules.format={formatter:i.table.modules.format.getFormatter(n.definition[t+"CalcFormatter"]),params:n.definition[t+"CalcFormatterParams"]}:i.genColumn.modules.format={formatter:i.table.modules.format.getFormatter("plaintext"),params:{}},i.genColumn.definition.cssClass=n.definition.cssClass;var s=new l(i.genColumn,o);s.column=n,s.setWidth(),n.cells.push(s),e.push(s),n.visible||s.hide()}),this.cells=e},o},g.prototype.generateRowData=function(t,e){var o,i,n={},s="top"==t?this.topCalcs:this.botCalcs,r="top"==t?"topCalc":"botCalc";return s.forEach(function(t){var s=[];t.modules.columnCalcs&&t.modules.columnCalcs[r]&&(e.forEach(function(e){s.push(t.getFieldValue(e))}),i=r+"Params",o="function"==typeof t.modules.columnCalcs[i]?t.modules.columnCalcs[i](s,e):t.modules.columnCalcs[i],t.setFieldValue(n,t.modules.columnCalcs[r](s,e,o)))}),n},g.prototype.hasTopCalcs=function(){return!!this.topCalcs.length},g.prototype.hasBottomCalcs=function(){return!!this.botCalcs.length},g.prototype.redraw=function(){this.topRow&&this.topRow.normalizeHeight(!0),this.botRow&&this.botRow.normalizeHeight(!0)},g.prototype.getResults=function(){var t,e=this,o={};return this.table.options.groupBy&&this.table.modExists("groupRows")?(t=this.table.modules.groupRows.getGroups(!0),t.forEach(function(t){o[t.getKey()]=e.getGroupResults(t)})):o={top:this.topRow?this.topRow.getData():{},bottom:this.botRow?this.botRow.getData():{}},o},g.prototype.getGroupResults=function(t){var e=this,o=t._getSelf(),i=t.getSubGroups(),n={};return i.forEach(function(t){n[t.getKey()]=e.getGroupResults(t)}),{top:o.calcs.top?o.calcs.top.getData():{},bottom:o.calcs.bottom?o.calcs.bottom.getData():{},groups:n}},g.prototype.calculations={avg:function(t,e,o){var i=0,n=void 0!==o.precision?o.precision:2;return t.length&&(i=t.reduce(function(t,e){return e=Number(e),t+e}),i/=t.length,i=!1!==n?i.toFixed(n):i),parseFloat(i).toString()},max:function(t,e,o){var i=null,n=void 0!==o.precision&&o.precision;return t.forEach(function(t){((t=Number(t))>i||null===i)&&(i=t)}),null!==i?!1!==n?i.toFixed(n):i:""},min:function(t,e,o){var i=null,n=void 0!==o.precision&&o.precision;return t.forEach(function(t){((t=Number(t))<i||null===i)&&(i=t)}),null!==i?!1!==n?i.toFixed(n):i:""},sum:function(t,e,o){var i=0,n=void 0!==o.precision&&o.precision;return t.length&&t.forEach(function(t){t=Number(t),i+=isNaN(t)?0:Number(t)}),!1!==n?i.toFixed(n):i},concat:function(t,e,o){var i=0;return t.length&&(i=t.reduce(function(t,e){return String(t)+String(e)})),i},count:function(t,e,o){var i=0;return t.length&&t.forEach(function(t){t&&i++}),i}},u.prototype.registerModule("columnCalcs",g);var b=function(t){this.table=t,this.mode=!0,this.copySelector=!1,this.copySelectorParams={},this.copyFormatter=!1,this.copyFormatterParams={},this.pasteParser=function(){},this.pasteAction=function(){},this.htmlElement=!1,this.config={},this.blocked=!0};b.prototype.initialize=function(){var t=this;this.mode=this.table.options.clipboard,!0!==this.mode&&"copy"!==this.mode||this.table.element.addEventListener("copy",function(e){var o;t.processConfig(),t.blocked||(e.preventDefault(),o=t.generateContent(),window.clipboardData&&window.clipboardData.setData?window.clipboardData.setData("Text",o):e.clipboardData&&e.clipboardData.setData?(e.clipboardData.setData("text/plain",o),t.htmlElement&&e.clipboardData.setData("text/html",t.htmlElement.outerHTML)):e.originalEvent&&e.originalEvent.clipboardData.setData&&(e.originalEvent.clipboardData.setData("text/plain",o),t.htmlElement&&e.originalEvent.clipboardData.setData("text/html",t.htmlElement.outerHTML)),t.table.options.clipboardCopied.call(this.table,o),t.reset())}),!0!==this.mode&&"paste"!==this.mode||this.table.element.addEventListener("paste",function(e){t.paste(e)}),this.setPasteParser(this.table.options.clipboardPasteParser),this.setPasteAction(this.table.options.clipboardPasteAction)},b.prototype.processConfig=function(){var t={columnHeaders:"groups",rowGroups:!0,columnCalcs:!0};if(void 0!==this.table.options.clipboardCopyHeader&&(t.columnHeaders=this.table.options.clipboardCopyHeader,console.warn("DEPRECATION WARNING - clipboardCopyHeader option has been deprecated, please use the columnHeaders property on the clipboardCopyConfig option")),this.table.options.clipboardCopyConfig)for(var e in this.table.options.clipboardCopyConfig)t[e]=this.table.options.clipboardCopyConfig[e];t.rowGroups&&this.table.options.groupBy&&this.table.modExists("groupRows")&&(this.config.rowGroups=!0),t.columnHeaders?"groups"!==t.columnHeaders&&!0!==t||this.table.columnManager.columns.length==this.table.columnManager.columnsByIndex.length?this.config.columnHeaders="columns":this.config.columnHeaders="groups":this.config.columnHeaders=!1,t.columnCalcs&&this.table.modExists("columnCalcs")&&(this.config.columnCalcs=!0)},b.prototype.reset=function(){this.blocked=!1,this.originalSelectionText=""},b.prototype.setPasteAction=function(t){switch(void 0===t?"undefined":_typeof(t)){case"string":this.pasteAction=this.pasteActions[t],this.pasteAction||console.warn("Clipboard Error - No such paste action found:",t);break;case"function":this.pasteAction=t}},b.prototype.setPasteParser=function(t){switch(void 0===t?"undefined":_typeof(t)){case"string":this.pasteParser=this.pasteParsers[t],this.pasteParser||console.warn("Clipboard Error - No such paste parser found:",t);break;case"function":this.pasteParser=t}},b.prototype.paste=function(t){var e,o,i;this.checkPaseOrigin(t)&&(e=this.getPasteData(t),o=this.pasteParser.call(this,e),o?(t.preventDefault(),this.table.modExists("mutator")&&(o=this.mutateData(o)),i=this.pasteAction.call(this,o),this.table.options.clipboardPasted.call(this.table,e,o,i)):this.table.options.clipboardPasteError.call(this.table,e))},b.prototype.mutateData=function(t){var e=this,o=[];return Array.isArray(t)?t.forEach(function(t){o.push(e.table.modules.mutator.transformRow(t,"clipboard"))}):o=t,o},b.prototype.checkPaseOrigin=function(t){var e=!0;return("DIV"!=t.target.tagName||this.table.modules.edit.currentCell)&&(e=!1),e},b.prototype.getPasteData=function(t){var e;return window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData?e=t.clipboardData.getData("text/plain"):t.originalEvent&&t.originalEvent.clipboardData.getData&&(e=t.originalEvent.clipboardData.getData("text/plain")),e},b.prototype.copy=function(t,e,o,i,n){var s,r,a;this.blocked=!1,!0!==this.mode&&"copy"!==this.mode||(void 0!==window.getSelection&&void 0!==document.createRange?(s=document.createRange(),s.selectNodeContents(this.table.element),r=window.getSelection(),r.toString()&&n&&(t="userSelection",o="raw",e=r.toString()),r.removeAllRanges(),r.addRange(s)):void 0!==document.selection&&void 0!==document.body.createTextRange&&(a=document.body.createTextRange(),a.moveToElementText(this.table.element),a.select()),this.setSelector(t),this.copySelectorParams=void 0!==e&&null!=e?e:this.config.columnHeaders,this.setFormatter(o),this.copyFormatterParams=void 0!==i&&null!=i?i:{},document.execCommand("copy"),r&&r.removeAllRanges())},b.prototype.setSelector=function(t){switch(t=t||this.table.options.clipboardCopySelector,void 0===t?"undefined":_typeof(t)){case"string":this.copySelectors[t]?this.copySelector=this.copySelectors[t]:console.warn("Clipboard Error - No such selector found:",t);break;case"function":this.copySelector=t}},b.prototype.setFormatter=function(t){switch(t=t||this.table.options.clipboardCopyFormatter,void 0===t?"undefined":_typeof(t)){case"string":this.copyFormatters[t]?this.copyFormatter=this.copyFormatters[t]:console.warn("Clipboard Error - No such formatter found:",t);break;case"function":this.copyFormatter=t}},b.prototype.generateContent=function(){var t;return this.htmlElement=!1,t=this.copySelector.call(this,this.config,this.copySelectorParams),this.copyFormatter.call(this,t,this.config,this.copyFormatterParams)},b.prototype.generateSimpleHeaders=function(t){var e=[];return t.forEach(function(t){e.push(t.definition.title)}),e},b.prototype.generateColumnGroupHeaders=function(t){var e=this,o=[];return this.table.columnManager.columns.forEach(function(t){var i=e.processColumnGroup(t);i&&o.push(i)}),o},b.prototype.processColumnGroup=function(t){var e=this,o=t.columns,i={type:"group",title:t.definition.title,column:t};if(o.length){if(i.subGroups=[],i.width=0,o.forEach(function(t){var o=e.processColumnGroup(t);o&&(i.width+=o.width,i.subGroups.push(o))}),!i.width)return!1}else{if(!t.field||!(t.definition.clipboard||t.visible&&!1!==t.definition.clipboard))return!1;i.width=1}return i},b.prototype.groupHeadersToRows=function(t){function e(t,n){void 0===i[n]&&(i[n]=[]),i[n].push(t.title),t.subGroups?t.subGroups.forEach(function(t){e(t,n+1)}):o()}function o(){var t=0;i.forEach(function(e){var o=e.length;o>t&&(t=o)}),i.forEach(function(e){var o=e.length;if(o<t)for(var i=o;i<t;i++)e.push("")})}var i=[];return t.forEach(function(t){e(t,0)}),i},b.prototype.rowsToData=function(t,e,o,i){var n=[];return t.forEach(function(t){var o=[],i=t instanceof s?t.getData("clipboard"):t;e.forEach(function(t){var e=t.getFieldValue(i);switch(void 0===e?"undefined":_typeof(e)){case"object":e=JSON.stringify(e);break;case"undefined":case"null":e="";break;default:e=e}o.push(e)}),n.push(o)}),n},b.prototype.buildComplexRows=function(t){var e=this,o=[];return this.table.modules.groupRows.getGroups().forEach(function(t){o.push(e.processGroupData(t))}),o},b.prototype.processGroupData=function(t){var e=this,o=t.getSubGroups(),i={type:"group",key:t.key};return o.length?(i.subGroups=[],o.forEach(function(t){i.subGroups.push(e.processGroupData(t))})):i.rows=t.getRows(!0),i},b.prototype.getCalcRow=function(t,e,o,i){var n=t[o];return n&&(i&&(n=n[i]),Object.keys(n).length)?this.rowsToData([n],e):[]},b.prototype.buildOutput=function(t,e,o){var i,n=this,s=[],r=[],a=[];return this.table.columnManager.columnsByIndex.forEach(function(t){(t.definition.clipboard||t.visible&&!1!==t.definition.clipboard)&&a.push(t)}),"groups"==e.columnHeaders?(r=this.generateColumnGroupHeaders(this.table.columnManager.columns),s=s.concat(this.groupHeadersToRows(r))):(r=a,s.push(this.generateSimpleHeaders(r))),this.config.columnCalcs&&(i=this.table.getCalcResults()),this.table.options.clipboardCopyStyled&&this.generateHTML(t,r,i,e,o),e.rowGroups?t.forEach(function(t){s=s.concat(n.parseRowGroupData(t,a,e,o,i||{}))}):(e.columnCalcs&&(s=s.concat(this.getCalcRow(i,a,"top"))),s=s.concat(this.rowsToData(t,a,e,o)),e.columnCalcs&&(s=s.concat(this.getCalcRow(i,a,"bottom")))),s},b.prototype.parseRowGroupData=function(t,e,o,i,n){var s=this,r=[];return r.push([t.key]),t.subGroups?t.subGroups.forEach(function(e){r=r.concat(s.parseRowGroupData(e,o,i,n[t.key]?n[t.key].groups||{}:{}))}):(o.columnCalcs&&(r=r.concat(this.getCalcRow(n,e,t.key,"top"))),r=r.concat(this.rowsToData(t.rows,e,o,i)),o.columnCalcs&&(r=r.concat(this.getCalcRow(n,e,t.key,"bottom")))),r},b.prototype.generateHTML=function(t,e,o,i,n){function r(t,e){var o=[];return void 0===y[e]&&(y[e]=[]),y[e].push({title:t.title,width:t.width,height:1,children:!!t.subGroups,element:t.column.getElement()}),t.subGroups?(t.subGroups.forEach(function(t){o=o.concat(r(t,e+1))}),o):[t.column]}function a(t,e,o){var i=t[e];i&&(o&&(i=i[o]),Object.keys(i).length&&l([i]))}function l(t){t.forEach(function(t,o){var i,n=document.createElement("tr"),r=m,a=!1;t instanceof s?i=t.getData("clipboard"):(i=t,a=!0),e.forEach(function(t,o){var s=document.createElement("td"),r=t.getFieldValue(i);switch(void 0===r?"undefined":_typeof(r)){case"object":r=JSON.stringify(r);break;case"undefined":case"null":r="";break;default:r=r}s.innerHTML=r,t.definition.align&&(s.style.textAlign=t.definition.align),e.length,f&&v.mapElementStyles(f,s,["border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size"]),n.appendChild(s)}),a?r=p:(o%2||!d||(r=d),o%2&&h&&(r=h)),r&&v.mapElementStyles(r,n,["border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size","background-color"]),u.appendChild(n)})}function c(t,o){var n=document.createElement("tr"),s=document.createElement("td");s.colSpan=e.length,s.innerHTML=t.key,n.appendChild(s),u.appendChild(n),v.mapElementStyles(g,n,["border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size","background-color"]),t.subGroups?t.subGroups.forEach(function(e){c(e,o[t.key]?o[t.key].groups||{}:{})}):(i.columnCalcs&&a(o,t.key,"top"),l(t.rows),i.columnCalcs&&a(o,t.key,"bottom"))}var u,d,h,p,m,f,g,b,v=this,y=[];if(this.htmlElement=document.createElement("table"),v.mapElementStyles(this.table.element,this.htmlElement,["border-top","border-left","border-right","border-bottom"]),i.columnHeaders)if("groups"==i.columnHeaders){var w=[];e.forEach(function(t){w=w.concat(r(t,0))}),e=w,function(){y.forEach(function(t,e){t.forEach(function(t){t.children||(t.height=y.length-e)})})}(),function(t){var e=document.createElement("thead");t.forEach(function(t){var o=document.createElement("tr");t.forEach(function(t){var e=document.createElement("th");t.width>1&&(e.colSpan=t.width),t.height>1&&(e.rowSpan=t.height),e.innerHTML=t.title,v.mapElementStyles(t.element,e,["border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),o.appendChild(e)}),v.mapElementStyles(v.table.columnManager.getHeadersElement(),o,["border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),e.appendChild(o)}),v.htmlElement.appendChild(e)}(y)}else!function(){var t=document.createElement("tr");e.forEach(function(e){var o=document.createElement("th");o.innerHTML=e.definition.title,v.mapElementStyles(e.getElement(),o,["border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),t.appendChild(o)}),v.mapElementStyles(v.table.columnManager.getHeadersElement(),t,["border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),v.htmlElement.appendChild(document.createElement("thead").appendChild(t))}();u=document.createElement("tbody"),window.getComputedStyle&&(d=this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)"),h=this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)"),p=this.table.element.querySelector(".tabulator-row.tabulator-calcs"),m=this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)"),g=this.table.element.getElementsByClassName("tabulator-group")[0],m&&(b=m.getElementsByClassName("tabulator-cell"),f=b[0],b[b.length-1])),i.rowGroups?t.forEach(function(t){c(t,o||{})}):(i.columnCalcs&&a(o,"top"),l(t),i.columnCalcs&&a(o,"bottom")),this.htmlElement.appendChild(u)},b.prototype.mapElementStyles=function(t,e,o){var i={"background-color":"backgroundColor",color:"fontColor","font-weight":"fontWeight","font-family":"fontFamily","font-size":"fontSize","border-top":"borderTop","border-left":"borderLeft","border-right":"borderRight","border-bottom":"borderBottom"};if(window.getComputedStyle){var n=window.getComputedStyle(t);o.forEach(function(t){e.style[i[t]]=n.getPropertyValue(t)})}},b.prototype.copySelectors={userSelection:function(t,e){return e},selected:function(t,e){var o=[];return this.table.modExists("selectRow",!0)&&(o=this.table.modules.selectRow.getSelectedRows()),t.rowGroups&&console.warn("Clipboard Warning - select coptSelector does not support row groups"),this.buildOutput(o,t,e)},table:function(t,e){return t.rowGroups&&console.warn("Clipboard Warning - table coptSelector does not support row groups"),this.buildOutput(this.table.rowManager.getComponents(),t,e)},active:function(t,e){var o;return o=t.rowGroups?this.buildComplexRows(t):this.table.rowManager.getComponents("active"),this.buildOutput(o,t,e)},visible:function(t,e){var o;return o=t.rowGroups?this.buildComplexRows(t):this.table.rowManager.getComponents("visible"),this.buildOutput(o,t,e)}},b.prototype.copyFormatters={raw:function(t,e){return t},table:function(t,e){var o=[];return t.forEach(function(t){var e=[];t.forEach(function(t){void 0===t&&(t=""),t=void 0===t||null===t?"":t.toString(),t.match(/\r|\n/)&&(t=t.split('"').join('""'),t='"'+t+'"'),e.push(t)}),o.push(e.join("\t"))}),o.join("\n")}},b.prototype.pasteParsers={table:function(t){var e=[],o=!0,i=this.table.columnManager.columns,n=[],s=[];return t=t.split("\n"),t.forEach(function(t){e.push(t.split("\t"))}),!(!e.length||1===e.length&&e[0].length<2)&&(!0,e[0].forEach(function(t){var e=i.find(function(e){return t&&e.definition.title&&t.trim()&&e.definition.title.trim()===t.trim()});e?n.push(e):o=!1}),o||(o=!0,n=[],e[0].forEach(function(t){var e=i.find(function(e){return t&&e.field&&t.trim()&&e.field.trim()===t.trim()});e?n.push(e):o=!1}),o||(n=this.table.columnManager.columnsByIndex)),o&&e.shift(),e.forEach(function(t){var e={};t.forEach(function(t,o){n[o]&&(e[n[o].field]=t)}),s.push(e)}),s)}},b.prototype.pasteActions={replace:function(t){return this.table.setData(t)},update:function(t){return this.table.updateOrAddData(t)},insert:function(t){return this.table.addData(t)}},u.prototype.registerModule("clipboard",b);var v=function(t){this.table=t,this.indent=10,this.field="",this.collapseEl=null,this.expandEl=null,this.branchEl=null,this.elementField=!1,this.startOpen=function(){},this.displayIndex=0};v.prototype.initialize=function(){var t=null,e=this.table.columnManager.getFirstVisibileColumn(),o=this.table.options;switch(this.field=o.dataTreeChildField,this.indent=o.dataTreeChildIndent,this.elementField=o.dataTreeElementColumn||!!e&&e.field,o.dataTreeBranchElement&&(!0===o.dataTreeBranchElement?(this.branchEl=document.createElement("div"),this.branchEl.classList.add("tabulator-data-tree-branch")):"string"==typeof o.dataTreeBranchElement?(t=document.createElement("div"),t.innerHTML=o.dataTreeBranchElement,this.branchEl=t.firstChild):this.branchEl=o.dataTreeBranchElement),o.dataTreeCollapseElement?"string"==typeof o.dataTreeCollapseElement?(t=document.createElement("div"),t.innerHTML=o.dataTreeCollapseElement,this.collapseEl=t.firstChild):this.collapseEl=o.dataTreeCollapseElement:(this.collapseEl=document.createElement("div"),this.collapseEl.classList.add("tabulator-data-tree-control"),this.collapseEl.tabIndex=0,this.collapseEl.innerHTML="<div class='tabulator-data-tree-control-collapse'></div>"),o.dataTreeExpandElement?"string"==typeof o.dataTreeExpandElement?(t=document.createElement("div"),t.innerHTML=o.dataTreeExpandElement,this.expandEl=t.firstChild):this.expandEl=o.dataTreeExpandElement:(this.expandEl=document.createElement("div"),this.expandEl.classList.add("tabulator-data-tree-control"),this.expandEl.tabIndex=0,this.expandEl.innerHTML="<div class='tabulator-data-tree-control-expand'></div>"),_typeof(o.dataTreeStartExpanded)){case"boolean":this.startOpen=function(t,e){return o.dataTreeStartExpanded};break;case"function":this.startOpen=o.dataTreeStartExpanded;break;default:this.startOpen=function(t,e){return o.dataTreeStartExpanded[e]}}},v.prototype.initializeRow=function(t){var e=t.getData()[this.field],o=Array.isArray(e),i=o||!o&&"object"===(void 0===e?"undefined":_typeof(e))&&null!==e;t.modules.dataTree={index:0,open:!!i&&this.startOpen(t.getComponent(),0),controlEl:!1,branchEl:!1,parent:!1,children:i}},v.prototype.layoutRow=function(t){var e=this.elementField?t.getCell(this.elementField):t.getCells()[0],o=e.getElement(),i=t.modules.dataTree;i.branchEl&&i.branchEl.parentNode.removeChild(i.branchEl),this.generateControlElement(t,o),i.index&&(this.branchEl?(i.branchEl=this.branchEl.cloneNode(!0),o.insertBefore(i.branchEl,o.firstChild),i.branchEl.style.marginLeft=(i.branchEl.offsetWidth+i.branchEl.style.marginRight)*(i.index-1)+i.index*this.indent+"px"):o.style.paddingLeft=parseInt(window.getComputedStyle(o,null).getPropertyValue("padding-left"))+i.index*this.indent+"px")},v.prototype.generateControlElement=function(t,e){var o=this,i=t.modules.dataTree,e=e||t.getCells()[0].getElement(),n=i.controlEl;!1!==i.children&&(i.open?(i.controlEl=this.collapseEl.cloneNode(!0),i.controlEl.addEventListener("click",function(e){e.stopPropagation(),o.collapseRow(t)})):(i.controlEl=this.expandEl.cloneNode(!0),i.controlEl.addEventListener("click",function(e){e.stopPropagation(),o.expandRow(t)})),i.controlEl.addEventListener("mousedown",function(t){t.stopPropagation()}),n&&n.parentNode===e?n.parentNode.replaceChild(i.controlEl,n):e.insertBefore(i.controlEl,e.firstChild))},v.prototype.setDisplayIndex=function(t){this.displayIndex=t},v.prototype.getDisplayIndex=function(){return this.displayIndex},v.prototype.getRows=function(t){var e=this,o=[];return t.forEach(function(t,i){var n,s;o.push(t),t instanceof r&&(n=t.modules.dataTree.children,n.index||!1===n.children||(s=e.getChildren(t),s.forEach(function(t){o.push(t)})))}),o},v.prototype.getChildren=function(t){var e=this,o=t.modules.dataTree,i=[],n=[];return!1!==o.children&&o.open&&(Array.isArray(o.children)||(o.children=this.generateChildren(t)),i=this.table.modExists("filter")?this.table.modules.filter.filter(o.children):o.children,this.table.modExists("sort")&&this.table.modules.sort.sort(i),i.forEach(function(t){n.push(t),e.getChildren(t).forEach(function(t){n.push(t)})})),n},v.prototype.generateChildren=function(t){var e=this,o=[],i=t.getData()[this.field];return Array.isArray(i)||(i=[i]),i.forEach(function(i){var n=new r(i||{},e.table.rowManager);n.modules.dataTree.index=t.modules.dataTree.index+1,n.modules.dataTree.parent=t,n.modules.dataTree.children&&(n.modules.dataTree.open=e.startOpen(n.getComponent(),n.modules.dataTree.index)),o.push(n)}),o},v.prototype.expandRow=function(t,e){var o=t.modules.dataTree;!1!==o.children&&(o.open=!0,t.reinitialize(),this.table.rowManager.refreshActiveData("tree",!1,!0),this.table.options.dataTreeRowExpanded(t.getComponent(),t.modules.dataTree.index))},v.prototype.collapseRow=function(t){var e=t.modules.dataTree;!1!==e.children&&(e.open=!1,t.reinitialize(),this.table.rowManager.refreshActiveData("tree",!1,!0),this.table.options.dataTreeRowCollapsed(t.getComponent(),t.modules.dataTree.index))},v.prototype.toggleRow=function(t){var e=t.modules.dataTree;!1!==e.children&&(e.open?this.collapseRow(t):this.expandRow(t))},v.prototype.getTreeParent=function(t){return!!t.modules.dataTree.parent&&t.modules.dataTree.parent.getComponent()},v.prototype.getTreeChildren=function(t){var e=t.modules.dataTree,o=[];return e.children&&(Array.isArray(e.children)||(e.children=this.generateChildren(t)),e.children.forEach(function(t){t instanceof r&&o.push(t.getComponent())})),o},v.prototype.checkForRestyle=function(t){t.row.cells.indexOf(t)||!1!==t.row.modules.dataTree.children&&t.row.reinitialize()},v.prototype.getChildField=function(){return this.field},v.prototype.redrawNeeded=function(t){return!!this.field&&void 0!==t[this.field]||!!this.elementField&&void 0!==t[this.elementField]},u.prototype.registerModule("dataTree",v)
;var y=function(t){this.table=t,this.fields={},this.columnsByIndex=[],this.columnsByField={},this.config={},this.active=!1};y.prototype.download=function(t,e,o,i,n){function s(o,i){n?!0===n?r.triggerDownload(o,i,t,e,!0):n(o):r.triggerDownload(o,i,t,e)}var r=this,a=!1;this.processConfig(),this.active=i,"function"==typeof t?a=t:r.downloaders[t]?a=r.downloaders[t]:console.warn("Download Error - No such download type found: ",t),this.processColumns(),a&&a.call(this,r.processDefinitions(),r.processData(i||"active"),o||{},s,this.config)},y.prototype.processConfig=function(){var t={columnGroups:!0,rowGroups:!0,columnCalcs:!0};if(this.table.options.downloadConfig)for(var e in this.table.options.downloadConfig)t[e]=this.table.options.downloadConfig[e];t.rowGroups&&this.table.options.groupBy&&this.table.modExists("groupRows")&&(this.config.rowGroups=!0),t.columnGroups&&this.table.columnManager.columns.length!=this.table.columnManager.columnsByIndex.length&&(this.config.columnGroups=!0),t.columnCalcs&&this.table.modExists("columnCalcs")&&(this.config.columnCalcs=!0)},y.prototype.processColumns=function(){var t=this;t.columnsByIndex=[],t.columnsByField={},t.table.columnManager.columnsByIndex.forEach(function(e){e.field&&!1!==e.definition.download&&(e.visible||!e.visible&&e.definition.download)&&(t.columnsByIndex.push(e),t.columnsByField[e.field]=e)})},y.prototype.processDefinitions=function(){var t=this,e=[];return this.config.columnGroups?t.table.columnManager.columns.forEach(function(o){var i=t.processColumnGroup(o);i&&e.push(i)}):t.columnsByIndex.forEach(function(o){!1!==o.download&&e.push(t.processDefinition(o))}),e},y.prototype.processColumnGroup=function(t){var e=this,o=t.columns,i=0,n=this.processDefinition(t),s={type:"group",title:n.title,depth:1};if(o.length){if(s.subGroups=[],s.width=0,o.forEach(function(t){var o=e.processColumnGroup(t);o.depth>i&&(i=o.depth),o&&(s.width+=o.width,s.subGroups.push(o))}),s.depth+=i,!s.width)return!1}else{if(!t.field||!1===t.definition.download||!(t.visible||!t.visible&&t.definition.download))return!1;s.width=1,s.definition=n}return s},y.prototype.processDefinition=function(t){var e={};for(var o in t.definition)e[o]=t.definition[o];return void 0!==t.definition.downloadTitle&&(e.title=t.definition.downloadTitle),e},y.prototype.processData=function(t){var e=this,o=this,i=[],n=[],s=!1,r={};return this.config.rowGroups?("visible"==t?(s=o.table.rowManager.getRows(t),s.forEach(function(t){if("row"==t.type){var e=t.getGroup();-1===n.indexOf(e)&&n.push(e)}})):n=this.table.modules.groupRows.getGroups(),n.forEach(function(t){i.push(e.processGroupData(t,s))})):i=o.table.rowManager.getData(t,"download"),this.config.columnCalcs&&(r=this.table.getCalcResults(),i={calcs:r,data:i}),"function"==typeof o.table.options.downloadDataFormatter&&(i=o.table.options.downloadDataFormatter(i)),i},y.prototype.processGroupData=function(t,e){var o=this,i=t.getSubGroups(),n={type:"group",key:t.key};return i.length?(n.subGroups=[],i.forEach(function(t){n.subGroups.push(o.processGroupData(t,e))})):e?(n.rows=[],t.rows.forEach(function(t){e.indexOf(t)>-1&&n.rows.push(t.getData("download"))})):n.rows=t.getData(!0,"download"),n},y.prototype.triggerDownload=function(t,e,o,i,n){var s=document.createElement("a"),r=new Blob([t],{type:e}),i=i||"Tabulator."+("function"==typeof o?"txt":o);(r=this.table.options.downloadReady.call(this.table,t,r))&&(n?window.open(window.URL.createObjectURL(r)):navigator.msSaveOrOpenBlob?navigator.msSaveOrOpenBlob(r,i):(s.setAttribute("href",window.URL.createObjectURL(r)),s.setAttribute("download",i),s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)),this.table.options.downloadComplete&&this.table.options.downloadComplete())},y.prototype.getFieldValue=function(t,e){var o=this.columnsByField[t];return!!o&&o.getFieldValue(e)},y.prototype.commsReceived=function(t,e,o){switch(e){case"intercept":this.download(o.type,"",o.options,o.active,o.intercept)}},y.prototype.downloaders={csv:function(t,e,o,i,n){function s(t,e){t.subGroups?t.subGroups.forEach(function(t){s(t,e+1)}):(d.push('"'+String(t.title).split('"').join('""')+'"'),h.push(t.definition.field))}function r(t){t.forEach(function(t){var e=[];h.forEach(function(o){var i=u.getFieldValue(o,t);switch(void 0===i?"undefined":_typeof(i)){case"object":i=JSON.stringify(i);break;case"undefined":case"null":i="";break;default:i=i}e.push('"'+String(i).split('"').join('""')+'"')}),l.push(e.join(p))})}function a(t){t.subGroups?t.subGroups.forEach(function(t){a(t)}):r(t.rows)}var l,c,u=this,d=[],h=[],p=o&&o.delimiter?o.delimiter:",";n.columnGroups?(console.warn("Download Warning - CSV downloader cannot process column groups"),t.forEach(function(t){s(t,0)})):function(){t.forEach(function(t){d.push('"'+String(t.title).split('"').join('""')+'"'),h.push(t.field)})}(),l=[d.join(p)],n.columnCalcs&&(console.warn("Download Warning - CSV downloader cannot process column calculations"),e=e.data),n.rowGroups?(console.warn("Download Warning - CSV downloader cannot process row groups"),e.forEach(function(t){a(t)})):r(e),c=l.join("\n"),o.bom&&(c="\ufeff"+c),i(c,"text/csv")},json:function(t,e,o,i,n){var s;n.columnCalcs&&(console.warn("Download Warning - CSV downloader cannot process column calculations"),e=e.data),s=JSON.stringify(e,null,"\t"),i(s,"application/json")},pdf:function(t,e,o,i,n){function s(t,e){var o=t.width,i=1,n={content:t.title||""};if(t.subGroups?(t.subGroups.forEach(function(t){s(t,e+1)}),i=1):(h.push(t.definition.field),i=g-e),n.rowSpan=i,p[e].push(n),o--,i>1)for(var r=e+1;r<g;r++)p[r].push("");for(var r=0;r<o;r++)p[e].push("")}function r(t){switch(void 0===t?"undefined":_typeof(t)){case"object":t=JSON.stringify(t);break;case"undefined":case"null":t="";break;default:t=t}return t}function a(t){t.forEach(function(t){m.push(l(t))})}function l(t,e){var o=[];return h.forEach(function(i){var n=d.getFieldValue(i,t);n=r(n),e?o.push({content:n,styles:e}):o.push(n)}),o}function c(t,e){var o=[];o.push({content:r(t.key),colSpan:h.length,styles:v}),m.push(o),t.subGroups?t.subGroups.forEach(function(o){c(o,e[t.key]?e[t.key].groups||{}:{})}):(n.columnCalcs&&u(e,t.key,"top"),a(t.rows),n.columnCalcs&&u(e,t.key,"bottom"))}function u(t,e,o){var i=t[e];i&&(o&&(i=i[o]),Object.keys(i).length&&m.push(l(i,y)))}var d=this,h=[],p=[],m=[],f={},g=1,b={},v=o.rowGroupStyles||{fontStyle:"bold",fontSize:12,cellPadding:6,fillColor:220},y=o.rowCalcStyles||{fontStyle:"bold",fontSize:10,cellPadding:4,fillColor:232},w=o.jsPDF||{},E=o&&o.title?o.title:"";if(n.columnCalcs&&(f=e.calcs,e=e.data),w.orientation||(w.orientation=o.orientation||"landscape"),w.unit||(w.unit="pt"),n.columnGroups){t.forEach(function(t){t.depth>g&&(g=t.depth)});for(var C=0;C<g;C++)p.push([]);t.forEach(function(t){s(t,0)})}else!function(){t.forEach(function(t){t.field&&(p.push(t.title||""),h.push(t.field))}),p=[p]}();n.rowGroups?e.forEach(function(t){c(t,f)}):(n.columnCalcs&&u(f,"top"),a(e),n.columnCalcs&&u(f,"bottom"));var R=new jsPDF(w);o&&o.autoTable&&(b="function"==typeof o.autoTable?o.autoTable(R)||{}:o.autoTable),E&&(b.addPageContent=function(t){R.text(E,40,30)}),b.head=p,b.body=m,R.autoTable(b),o&&o.documentProcessing&&o.documentProcessing(R),i(R.output("arraybuffer"),"application/pdf")},xlsx:function(t,e,o,i,n){function s(){function o(t,e){void 0===f[e]&&(f[e]=[]),void 0===h[e]&&(h[e]=[]),t.width>1&&h[e].push({type:"hoz",start:f[e].length,end:f[e].length+t.width-1}),f[e].push(t.title),t.subGroups?t.subGroups.forEach(function(t){o(t,e+1)}):(g.push(t.definition.field),i(g.length),h[e].push({type:"vert",start:g.length-1}))}function i(){var t=0;f.forEach(function(e){var o=e.length;o>t&&(t=o)}),f.forEach(function(e){var o=e.length;if(o<t)for(var i=o;i<t;i++)e.push("")})}function s(){var t=[];return d.forEach(function(e){t.push({s:{r:e,c:0},e:{r:e,c:g.length-1}})}),h.forEach(function(e,o){e.forEach(function(e){"hoz"===e.type?t.push({s:{r:o,c:e.start},e:{r:o,c:e.end}}):o!=f.length-1&&t.push({s:{r:o,c:e.start},e:{r:f.length-1,c:e.start}})})}),t}function r(t){t.forEach(function(t){b.push(l(t))})}function l(t){var e=[];return g.forEach(function(o){var i=a.getFieldValue(o,t);e.push(i instanceof Date||"object"!==(void 0===i?"undefined":_typeof(i))?i:JSON.stringify(i))}),e}function c(t,e,o){var i=t[e];i&&(o&&(i=i[o]),Object.keys(i).length&&(p.push(b.length),b.push(l(i))))}function m(t,e){var o=[];o.push(t.key),d.push(b.length),b.push(o),t.subGroups?t.subGroups.forEach(function(o){m(o,e[t.key]?e[t.key].groups||{}:{})}):(n.columnCalcs&&c(e,t.key,"top"),r(t.rows),n.columnCalcs&&c(e,t.key,"bottom"))}var f=[],g=[],b=[];return n.columnGroups?(t.forEach(function(t){o(t,0)}),f.forEach(function(t){b.push(t)})):function(){t.forEach(function(t){f.push(t.title),g.push(t.field)}),b.push(f)}(),n.rowGroups?e.forEach(function(t){m(t,u)}):(n.columnCalcs&&c(u,"top"),r(e),n.columnCalcs&&c(u,"bottom")),function(){var t={},e={s:{c:0,r:0},e:{c:g.length,r:b.length}};XLSX.utils.sheet_add_aoa(t,b),t["!ref"]=XLSX.utils.encode_range(e);var o=s();return o.length&&(t["!merges"]=o),t}()}var r,a=this,l=o.sheetName||"Sheet1",c=XLSX.utils.book_new(),u={},d=[],h=[],p=[];if(c.SheetNames=[],c.Sheets={},n.columnCalcs&&(u=e.calcs,e=e.data),o.sheetOnly)return void i(s());if(o.sheets)for(var m in o.sheets)!0===o.sheets[m]?(c.SheetNames.push(m),c.Sheets[m]=s()):(c.SheetNames.push(m),this.table.modules.comms.send(o.sheets[m],"download","intercept",{type:"xlsx",options:{sheetOnly:!0},active:a.active,intercept:function(t){c.Sheets[m]=t}}));else c.SheetNames.push(l),c.Sheets[l]=s();o.documentProcessing&&(c=o.documentProcessing(c)),r=XLSX.write(c,{bookType:"xlsx",bookSST:!0,type:"binary"}),i(function(t){for(var e=new ArrayBuffer(t.length),o=new Uint8Array(e),i=0;i!=t.length;++i)o[i]=255&t.charCodeAt(i);return e}(r),"application/octet-stream")},html:function(t,e,o,i,n){this.table.modExists("htmlTableExport",!0)&&i(this.table.modules.htmlTableExport.getHtml(!0,o.style,n),"text/html")}},u.prototype.registerModule("download",y);var w=function(t){this.table=t,this.currentCell=!1,this.mouseClick=!1,this.recursionBlock=!1,this.invalidEdit=!1};w.prototype.initializeColumn=function(t){var e=this,o={editor:!1,blocked:!1,check:t.definition.editable,params:t.definition.editorParams||{}};switch(_typeof(t.definition.editor)){case"string":"tick"===t.definition.editor&&(t.definition.editor="tickCross",console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor")),e.editors[t.definition.editor]?o.editor=e.editors[t.definition.editor]:console.warn("Editor Error - No such editor found: ",t.definition.editor);break;case"function":o.editor=t.definition.editor;break;case"boolean":!0===t.definition.editor&&("function"!=typeof t.definition.formatter?("tick"===t.definition.formatter&&(t.definition.formatter="tickCross",console.warn("DEPRECATION WARNING - the tick editor has been deprecated, please use the tickCross editor")),e.editors[t.definition.formatter]?o.editor=e.editors[t.definition.formatter]:o.editor=e.editors.input):console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ",t.definition.formatter))}o.editor&&(t.modules.edit=o)},w.prototype.getCurrentCell=function(){return!!this.currentCell&&this.currentCell.getComponent()},w.prototype.clearEditor=function(){var t,e=this.currentCell;if(this.invalidEdit=!1,e){for(this.currentCell=!1,t=e.getElement(),t.classList.remove("tabulator-validation-fail"),t.classList.remove("tabulator-editing");t.firstChild;)t.removeChild(t.firstChild);e.row.getElement().classList.remove("tabulator-row-editing")}},w.prototype.cancelEdit=function(){if(this.currentCell){var t=this.currentCell,e=this.currentCell.getComponent();this.clearEditor(),t.setValueActual(t.getValue()),t.column.cellEvents.cellEditCancelled&&t.column.cellEvents.cellEditCancelled.call(this.table,e),this.table.options.cellEditCancelled.call(this.table,e)}},w.prototype.bindEditor=function(t){var e=this,o=t.getElement();o.setAttribute("tabindex",0),o.addEventListener("click",function(t){o.classList.contains("tabulator-editing")||o.focus()}),o.addEventListener("mousedown",function(t){e.mouseClick=!0}),o.addEventListener("focus",function(o){e.recursionBlock||e.edit(t,o,!1)})},w.prototype.focusCellNoEvent=function(t,e){this.recursionBlock=!0,e&&"ie"===this.table.browser||t.getElement().focus(),this.recursionBlock=!1},w.prototype.editCell=function(t,e){this.focusCellNoEvent(t),this.edit(t,!1,e)},w.prototype.edit=function(t,e,o){function i(e){if(c.currentCell===t){var o=!0;return t.column.modules.validate&&c.table.modExists("validate")&&(o=c.table.modules.validate.validate(t.column.modules.validate,t.getComponent(),e)),!0===o?(c.clearEditor(),t.setValue(e,!0),c.table.options.dataTree&&c.table.modExists("dataTree")&&c.table.modules.dataTree.checkForRestyle(t),!0):(c.invalidEdit=!0,h.classList.add("tabulator-validation-fail"),c.focusCellNoEvent(t,!0),d(),c.table.options.validationFailed.call(c.table,t.getComponent(),e,o),!1)}}function n(){c.currentCell===t&&(c.cancelEdit(),c.table.options.dataTree&&c.table.modExists("dataTree")&&c.table.modules.dataTree.checkForRestyle(t))}function s(t){d=t}var r,a,l,c=this,u=!0,d=function(){},h=t.getElement();if(this.currentCell)return void(this.invalidEdit||this.cancelEdit());if(t.column.modules.edit.blocked)return this.mouseClick=!1,h.blur(),!1;switch(e&&e.stopPropagation(),_typeof(t.column.modules.edit.check)){case"function":u=t.column.modules.edit.check(t.getComponent());break;case"boolean":u=t.column.modules.edit.check}if(u||o){if(c.cancelEdit(),c.currentCell=t,a=t.getComponent(),this.mouseClick&&(this.mouseClick=!1,t.column.cellEvents.cellClick&&t.column.cellEvents.cellClick.call(this.table,e,a)),t.column.cellEvents.cellEditing&&t.column.cellEvents.cellEditing.call(this.table,a),c.table.options.cellEditing.call(this.table,a),l="function"==typeof t.column.modules.edit.params?t.column.modules.edit.params(a):t.column.modules.edit.params,!1===(r=t.column.modules.edit.editor.call(c,a,s,i,n,l)))return h.blur(),!1;if(!(r instanceof Node))return console.warn("Edit Error - Editor should return an instance of Node, the editor returned:",r),h.blur(),!1;for(h.classList.add("tabulator-editing"),t.row.getElement().classList.add("tabulator-row-editing");h.firstChild;)h.removeChild(h.firstChild);h.appendChild(r),d();for(var p=h.children,m=0;m<p.length;m++)p[m].addEventListener("click",function(t){t.stopPropagation()});return!0}return this.mouseClick=!1,h.blur(),!1},w.prototype.editors={input:function(t,e,o,i,n){function s(t){(null===r||void 0===r)&&""!==a.value||a.value!=r?o(a.value)&&(r=a.value):i()}var r=t.getValue(),a=document.createElement("input");if(a.setAttribute("type",n.search?"search":"text"),a.style.padding="4px",a.style.width="100%",a.style.boxSizing="border-box",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var l in n.elementAttributes)"+"==l.charAt(0)?(l=l.slice(1),a.setAttribute(l,a.getAttribute(l)+n.elementAttributes["+"+l])):a.setAttribute(l,n.elementAttributes[l]);return a.value=void 0!==r?r:"",e(function(){a.focus(),a.style.height="100%"}),a.addEventListener("change",s),a.addEventListener("blur",s),a.addEventListener("keydown",function(t){switch(t.keyCode){case 13:s(t);break;case 27:i()}}),a},textarea:function(t,e,o,i,n){function s(e){(null===r||void 0===r)&&""!==c.value||c.value!=r?(o(c.value)&&(r=c.value),setTimeout(function(){t.getRow().normalizeHeight()},300)):i()}var r=t.getValue(),a=n.verticalNavigation||"hybrid",l=String(null!==r&&void 0!==r?r:""),c=(l.match(/(?:\r\n|\r|\n)/g),document.createElement("textarea")),u=0;if(c.style.display="block",c.style.padding="2px",c.style.height="100%",c.style.width="100%",c.style.boxSizing="border-box",c.style.whiteSpace="pre-wrap",c.style.resize="none",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var d in n.elementAttributes)"+"==d.charAt(0)?(d=d.slice(1),c.setAttribute(d,c.getAttribute(d)+n.elementAttributes["+"+d])):c.setAttribute(d,n.elementAttributes[d]);return c.value=l,e(function(){c.focus(),c.style.height="100%"}),c.addEventListener("change",s),c.addEventListener("blur",s),c.addEventListener("keyup",function(){c.style.height="";var e=c.scrollHeight;c.style.height=e+"px",e!=u&&(u=e,t.getRow().normalizeHeight())}),c.addEventListener("keydown",function(t){switch(t.keyCode){case 27:i();break;case 38:("editor"==a||"hybrid"==a&&c.selectionStart)&&(t.stopImmediatePropagation(),t.stopPropagation());break;case 40:("editor"==a||"hybrid"==a&&c.selectionStart!==c.value.length)&&(t.stopImmediatePropagation(),t.stopPropagation())}}),c},number:function(t,e,o,i,n){function s(){var t=l.value;isNaN(t)||""===t||(t=Number(t)),t!=r?o(t)&&(r=t):i()}var r=t.getValue(),a=n.verticalNavigation||"editor",l=document.createElement("input");if(l.setAttribute("type","number"),void 0!==n.max&&l.setAttribute("max",n.max),void 0!==n.min&&l.setAttribute("min",n.min),void 0!==n.step&&l.setAttribute("step",n.step),l.style.padding="4px",l.style.width="100%",l.style.boxSizing="border-box",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var c in n.elementAttributes)"+"==c.charAt(0)?(c=c.slice(1),l.setAttribute(c,l.getAttribute(c)+n.elementAttributes["+"+c])):l.setAttribute(c,n.elementAttributes[c]);l.value=r;var u=function(t){s()};return e(function(){l.removeEventListener("blur",u),l.focus(),l.style.height="100%",l.addEventListener("blur",u)}),l.addEventListener("keydown",function(t){switch(t.keyCode){case 13:s();break;case 27:i();break;case 38:case 40:"editor"==a&&(t.stopImmediatePropagation(),t.stopPropagation())}}),l},range:function(t,e,o,i,n){function s(){var t=a.value;isNaN(t)||""===t||(t=Number(t)),t!=r?o(t)&&(r=t):i()}var r=t.getValue(),a=document.createElement("input");if(a.setAttribute("type","range"),void 0!==n.max&&a.setAttribute("max",n.max),void 0!==n.min&&a.setAttribute("min",n.min),void 0!==n.step&&a.setAttribute("step",n.step),a.style.padding="4px",a.style.width="100%",a.style.boxSizing="border-box",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var l in n.elementAttributes)"+"==l.charAt(0)?(l=l.slice(1),a.setAttribute(l,a.getAttribute(l)+n.elementAttributes["+"+l])):a.setAttribute(l,n.elementAttributes[l]);return a.value=r,e(function(){a.focus(),a.style.height="100%"}),a.addEventListener("blur",function(t){s()}),a.addEventListener("keydown",function(t){switch(t.keyCode){case 13:case 9:s();break;case 27:i()}}),a},select:function(t,e,o,i,n){function s(e){var o,i={},s=f.table.getData();return o=e?f.table.columnManager.getColumnByField(e):t.getColumn()._getSelf(),o?(s.forEach(function(t){var e=o.getFieldValue(t);null!==e&&void 0!==e&&""!==e&&(i[e]=!0)}),i=n.sortValuesList?"asc"==n.sortValuesList?Object.keys(i).sort():Object.keys(i).sort().reverse():Object.keys(i)):console.warn("unable to find matching column to create select lookup list:",e),i}function r(e,o){function i(t){var t={label:n.listItemFormatter?n.listItemFormatter(t.value,t.label):t.label,value:t.value,element:!1};return t.value!==o&&(isNaN(parseFloat(t.value))||isNaN(parseFloat(t.value))||parseFloat(t.value)!==parseFloat(o))||l(t),s.push(t),r.push(t),t}var s=[],r=[];if("function"==typeof e&&(e=e(t)),Array.isArray(e))e.forEach(function(t){var e;"object"===(void 0===t?"undefined":_typeof(t))?t.options?(e={label:t.label,group:!0,element:!1},r.push(e),t.options.forEach(function(t){i(t)})):i(t):(e={label:n.listItemFormatter?n.listItemFormatter(t,t):t,value:t,element:!1},e.value!==o&&(isNaN(parseFloat(e.value))||isNaN(parseFloat(e.value))||parseFloat(e.value)!==parseFloat(o))||l(e),s.push(e),r.push(e))});else for(var c in e){var u={label:n.listItemFormatter?n.listItemFormatter(c,e[c]):e[c],value:c,element:!1};u.value!==o&&(isNaN(parseFloat(u.value))||isNaN(parseFloat(u.value))||parseFloat(u.value)!==parseFloat(o))||l(u),s.push(u),r.push(u)}C=s,R=r,a()}function a(){for(;E.firstChild;)E.removeChild(E.firstChild);R.forEach(function(t){var e=t.element;e||(t.group?(e=document.createElement("div"),e.classList.add("tabulator-edit-select-list-group"),e.tabIndex=0,e.innerHTML=""===t.label?"&nbsp;":t.label):(e=document.createElement("div"),e.classList.add("tabulator-edit-select-list-item"),e.tabIndex=0,e.innerHTML=""===t.label?"&nbsp;":t.label,e.addEventListener("click",function(){l(t),c()}),t===x&&e.classList.add("active")),e.addEventListener("mousedown",function(){M=!1,setTimeout(function(){M=!0},10)}),t.element=e),E.appendChild(e)})}function l(t){x&&x.element&&x.element.classList.remove("active"),x=t,w.value="&nbsp;"===t.label?"":t.label,t.element&&t.element.classList.add("active")}function c(){p(),b!==x.value?(b=x.value,o(x.value)):i()}function d(){p(),i()}function h(){if(!E.parentNode){!0===n.values?r(s(),y):"string"==typeof n.values?r(s(n.values),y):r(n.values||[],y);var t=u.prototype.helpers.elOffset(g);E.style.minWidth=g.offsetWidth+"px",E.style.top=t.top+g.offsetHeight+"px",E.style.left=t.left+"px",document.body.appendChild(E)}}function p(){E.parentNode&&E.parentNode.removeChild(E),m()}function m(){f.table.rowManager.element.removeEventListener("scroll",d)}var f=this,g=t.getElement(),b=t.getValue(),v=n.verticalNavigation||"editor",y=void 0!==b||null===b?b:void 0!==n.defaultValue?n.defaultValue:"",w=document.createElement("input"),E=document.createElement("div"),C=[],R=[],x={},M=!0;if(this.table.rowManager.element.addEventListener("scroll",d),(Array.isArray(n)||!Array.isArray(n)&&"object"===(void 0===n?"undefined":_typeof(n))&&!n.values)&&(console.warn("DEPRECATION WANRING - values for the select editor must now be passed into the values property of the editorParams object, not as the editorParams object"),n={values:n}),w.setAttribute("type","text"),w.style.padding="4px",w.style.width="100%",w.style.boxSizing="border-box",w.style.cursor="default",w.readOnly=0!=this.currentCell,n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var D in n.elementAttributes)"+"==D.charAt(0)?(D=D.slice(1),w.setAttribute(D,w.getAttribute(D)+n.elementAttributes["+"+D])):w.setAttribute(D,n.elementAttributes[D]);return w.value=void 0!==b||null===b?b:"",w.addEventListener("keydown",function(t){var e;switch(t.keyCode){case 38:e=C.indexOf(x),("editor"==v||"hybrid"==v&&e)&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),e>0&&l(C[e-1]));break;case 40:e=C.indexOf(x),("editor"==v||"hybrid"==v&&e<C.length-1)&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),e<C.length-1&&l(-1==e?C[0]:C[e+1]));break;case 37:case 39:t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault();break;case 13:c();break;case 27:d()}}),w.addEventListener("blur",function(t){M&&d()}),w.addEventListener("focus",function(t){h()}),E=document.createElement("div"),E.classList.add("tabulator-edit-select-list"),e(function(){w.style.height="100%",w.focus()}),w},autocomplete:function(t,e,o,i,n){function s(e){var o,i={},s=g.table.getData();return o=e?g.table.columnManager.getColumnByField(e):t.getColumn()._getSelf(),o?(s.forEach(function(t){var e=o.getFieldValue(t);null!==e&&void 0!==e&&""!==e&&(i[e]=!0)}),i=n.sortValuesList?"asc"==n.sortValuesList?Object.keys(i).sort():Object.keys(i).sort().reverse():Object.keys(i)):console.warn("unable to find matching column to create autocomplete lookup list:",e),i}function r(t,e){var o=[];if(Array.isArray(t))t.forEach(function(t){var i={title:n.listItemFormatter?n.listItemFormatter(t,t):t,value:t,element:!1};i.value!==e&&(isNaN(parseFloat(i.value))||isNaN(parseFloat(i.value))||parseFloat(i.value)!==parseFloat(e))||c(i),o.push(i)});else for(var i in t){var s={title:n.listItemFormatter?n.listItemFormatter(i,t[i]):t[i],value:i,element:!1};s.value!==e&&(isNaN(parseFloat(s.value))||isNaN(parseFloat(s.value))||parseFloat(s.value)!==parseFloat(e))||c(s),o.push(s)}n.searchFunc&&o.forEach(function(t){t.search={title:t.title,value:t.value}}),R=o}function a(t,e){var o=[],i=[],s=[];n.searchFunc?(R.forEach(function(t){i.push(t.search)}),s=n.searchFunc(t,i),s.forEach(function(t){var e=R.find(function(e){return e.search===t});e&&o.push(e)})):""===t?n.showListOnEmpty&&R.forEach(function(t){o.push(t)}):R.forEach(function(e){null===e.value&&void 0===e.value||(String(e.value).toLowerCase().indexOf(String(t).toLowerCase())>-1||String(e.title).toLowerCase().indexOf(String(t).toLowerCase())>-1)&&o.push(e)}),x=o,l(e)}function l(t){for(var e=!1;C.firstChild;)C.removeChild(C.firstChild);x.forEach(function(o){var i=o.element;i||(i=document.createElement("div"),i.classList.add("tabulator-edit-select-list-item"),i.tabIndex=0,i.innerHTML=o.title,i.addEventListener("click",function(){c(o),d()}),i.addEventListener("mousedown",function(){L=!1,setTimeout(function(){L=!0},10)}),o.element=i,t&&o.value==v&&(E.value=o.title,o.element.classList.add("active"),e=!0),o===D&&(o.element.classList.add("active"),e=!0)),C.appendChild(i)}),e||c(!1)}function c(t,e){D&&D.element&&D.element.classList.remove("active"),D=t,t&&t.element&&t.element.classList.add("active")}function d(){m(),D?v!==D.value?(v=D.value,E.value=D.title,o(D.value)):i():n.freetext?(v=E.value,o(E.value)):n.allowEmpty&&""===E.value?(v=E.value,o(E.value)):i()}function h(){m(),i()}function p(){if(!C.parentNode){for(;C.firstChild;)C.removeChild(C.firstChild);M=!0===n.values?s():"string"==typeof n.values?s(n.values):n.values||[],r(M,v);var t=u.prototype.helpers.elOffset(b);C.style.minWidth=b.offsetWidth+"px",C.style.top=t.top+b.offsetHeight+"px",C.style.left=t.left+"px",document.body.appendChild(C)}}function m(){C.parentNode&&C.parentNode.removeChild(C),f()}function f(){g.table.rowManager.element.removeEventListener("scroll",h)}var g=this,b=t.getElement(),v=t.getValue(),y=n.verticalNavigation||"editor",w=void 0!==v||null===v?v:void 0!==n.defaultValue?n.defaultValue:"",E=document.createElement("input"),C=document.createElement("div"),R=[],x=[],M=[],D={},L=!0;if(this.table.rowManager.element.addEventListener("scroll",h),E.setAttribute("type","search"),E.style.padding="4px",E.style.width="100%",E.style.boxSizing="border-box",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var T in n.elementAttributes)"+"==T.charAt(0)?(T=T.slice(1),E.setAttribute(T,E.getAttribute(T)+n.elementAttributes["+"+T])):E.setAttribute(T,n.elementAttributes[T]);return E.addEventListener("keydown",function(t){var e;switch(t.keyCode){case 38:e=x.indexOf(D),("editor"==y||"hybrid"==y&&e)&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),c(e>0?x[e-1]:!1));break;case 40:e=x.indexOf(D),("editor"==y||"hybrid"==y&&e<x.length-1)&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),e<x.length-1&&c(-1==e?x[0]:x[e+1]));break;case 37:case 39:t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault();break;case 13:d();break;case 27:h();break;case 36:case 35:t.stopImmediatePropagation()}}),E.addEventListener("keyup",function(t){switch(t.keyCode){case 38:case 37:case 39:case 40:case 13:case 27:break;default:a(E.value)}}),E.addEventListener("search",function(t){a(E.value)}),E.addEventListener("blur",function(t){L&&d()}),E.addEventListener("focus",function(t){var e=w;p(),E.value=e,a(e,!0)}),C=document.createElement("div"),C.classList.add("tabulator-edit-select-list"),e(function(){E.style.height="100%",E.focus()}),E},star:function(t,e,o,i,n){function s(t){h.forEach(function(e,o){o<t?("ie"==a.table.browser?e.setAttribute("class","tabulator-star-active"):e.classList.replace("tabulator-star-inactive","tabulator-star-active"),e.innerHTML='<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>'):("ie"==a.table.browser?e.setAttribute("class","tabulator-star-inactive"):e.classList.replace("tabulator-star-active","tabulator-star-inactive"),e.innerHTML='<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>')})}function r(t){c=t,s(t)}var a=this,l=t.getElement(),c=t.getValue(),u=l.getElementsByTagName("svg").length||5,d=l.getElementsByTagName("svg")[0]?l.getElementsByTagName("svg")[0].getAttribute("width"):14,h=[],p=document.createElement("div"),m=document.createElementNS("http://www.w3.org/2000/svg","svg");if(l.style.whiteSpace="nowrap",l.style.overflow="hidden",l.style.textOverflow="ellipsis",p.style.verticalAlign="middle",p.style.display="inline-block",p.style.padding="4px",m.setAttribute("width",d),m.setAttribute("height",d),m.setAttribute("viewBox","0 0 512 512"),m.setAttribute("xml:space","preserve"),m.style.padding="0 1px",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var f in n.elementAttributes)"+"==f.charAt(0)?(f=f.slice(1),p.setAttribute(f,p.getAttribute(f)+n.elementAttributes["+"+f])):p.setAttribute(f,n.elementAttributes[f]);for(var g=1;g<=u;g++)!function(t){var e=document.createElement("span"),i=m.cloneNode(!0);h.push(i),e.addEventListener("mouseenter",function(e){e.stopPropagation(),e.stopImmediatePropagation(),s(t)}),e.addEventListener("mousemove",function(t){t.stopPropagation(),t.stopImmediatePropagation()}),e.addEventListener("click",function(e){e.stopPropagation(),e.stopImmediatePropagation(),o(t)}),e.appendChild(i),p.appendChild(e)}(g);return c=Math.min(parseInt(c),u),s(c),p.addEventListener("mousemove",function(t){s(0)}),p.addEventListener("click",function(t){o(0)}),l.addEventListener("blur",function(t){i()}),l.addEventListener("keydown",function(t){switch(t.keyCode){case 39:r(c+1);break;case 37:r(c-1);break;case 13:o(c);break;case 27:i()}}),p},progress:function(t,e,o,i,n){function s(){var t=d*Math.round(m.offsetWidth/(l.clientWidth/100))+u;o(t),l.setAttribute("aria-valuenow",t),l.setAttribute("aria-label",h)}var r,a,l=t.getElement(),c=void 0===n.max?l.getElementsByTagName("div")[0].getAttribute("max")||100:n.max,u=void 0===n.min?l.getElementsByTagName("div")[0].getAttribute("min")||0:n.min,d=(c-u)/100,h=t.getValue()||0,p=document.createElement("div"),m=document.createElement("div");if(p.style.position="absolute",p.style.right="0",p.style.top="0",p.style.bottom="0",p.style.width="5px",p.classList.add("tabulator-progress-handle"),m.style.display="inline-block",m.style.position="relative",m.style.height="100%",m.style.backgroundColor="#488CE9",m.style.maxWidth="100%",m.style.minWidth="0%",n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var f in n.elementAttributes)"+"==f.charAt(0)?(f=f.slice(1),m.setAttribute(f,m.getAttribute(f)+n.elementAttributes["+"+f])):m.setAttribute(f,n.elementAttributes[f]);return l.style.padding="4px 4px",h=Math.min(parseFloat(h),c),h=Math.max(parseFloat(h),u),h=Math.round((h-u)/d),m.style.width=h+"%",l.setAttribute("aria-valuemin",u),l.setAttribute("aria-valuemax",c),m.appendChild(p),p.addEventListener("mousedown",function(t){r=t.screenX,a=m.offsetWidth}),p.addEventListener("mouseover",function(){p.style.cursor="ew-resize"}),l.addEventListener("mousemove",function(t){r&&(m.style.width=a+t.screenX-r+"px")}),l.addEventListener("mouseup",function(t){r&&(t.stopPropagation(),t.stopImmediatePropagation(),r=!1,a=!1,s())}),l.addEventListener("keydown",function(t){switch(t.keyCode){case 39:m.style.width=m.clientWidth+l.clientWidth/100+"px";break;case 37:m.style.width=m.clientWidth-l.clientWidth/100+"px";break;case 13:s();break;case 27:i()}}),l.addEventListener("blur",function(){i()}),m},tickCross:function(t,e,o,i,n){function s(t){return l?t?u?c:a.checked:a.checked&&!u?(a.checked=!1,a.indeterminate=!0,u=!0,c):(u=!1,a.checked):a.checked}var r=t.getValue(),a=document.createElement("input"),l=n.tristate,c=void 0===n.indeterminateValue?null:n.indeterminateValue,u=!1;if(a.setAttribute("type","checkbox"),a.style.marginTop="5px",a.style.boxSizing="border-box",
n.elementAttributes&&"object"==_typeof(n.elementAttributes))for(var d in n.elementAttributes)"+"==d.charAt(0)?(d=d.slice(1),a.setAttribute(d,a.getAttribute(d)+n.elementAttributes["+"+d])):a.setAttribute(d,n.elementAttributes[d]);return a.value=r,!l||void 0!==r&&r!==c&&""!==r||(u=!0,a.indeterminate=!0),"firefox"!=this.table.browser&&e(function(){a.focus()}),a.checked=!0===r||"true"===r||"True"===r||1===r,a.addEventListener("change",function(t){o(s())}),a.addEventListener("blur",function(t){o(s(!0))}),a.addEventListener("keydown",function(t){13==t.keyCode&&o(s()),27==t.keyCode&&i()}),a}},u.prototype.registerModule("edit",w);var E=function(t){this.table=t,this.filterList=[],this.headerFilters={},this.headerFilterColumns=[],this.changed=!1};E.prototype.initializeColumn=function(t,e){function o(e){var o,s="input"==t.modules.filter.tagType&&"text"==t.modules.filter.attrType||"textarea"==t.modules.filter.tagType?"partial":"match",r="";if(void 0===t.modules.filter.prevSuccess||t.modules.filter.prevSuccess!==e){if(t.modules.filter.prevSuccess=e,t.modules.filter.emptyFunc(e))delete i.headerFilters[n];else{switch(t.modules.filter.value=e,_typeof(t.definition.headerFilterFunc)){case"string":i.filters[t.definition.headerFilterFunc]?(r=t.definition.headerFilterFunc,o=function(o){var n=t.definition.headerFilterFuncParams||{},s=t.getFieldValue(o);return n="function"==typeof n?n(e,s,o):n,i.filters[t.definition.headerFilterFunc](e,s,o,n)}):console.warn("Header Filter Error - Matching filter function not found: ",t.definition.headerFilterFunc);break;case"function":o=function(o){var i=t.definition.headerFilterFuncParams||{},n=t.getFieldValue(o);return i="function"==typeof i?i(e,n,o):i,t.definition.headerFilterFunc(e,n,o,i)},r=o}if(!o)switch(s){case"partial":o=function(o){var i=t.getFieldValue(o);return void 0!==i&&null!==i&&String(i).toLowerCase().indexOf(String(e).toLowerCase())>-1},r="like";break;default:o=function(o){return t.getFieldValue(o)==e},r="="}i.headerFilters[n]={value:e,func:o,type:r}}i.changed=!0,i.table.rowManager.filterRefresh()}return!0}var i=this,n=t.getField();t.modules.filter={success:o,attrType:!1,tagType:!1,emptyFunc:!1},this.generateHeaderFilterElement(t)},E.prototype.generateHeaderFilterElement=function(t,e,o){function i(){}var n,s,r,a,l,c,u,d=this,h=this,p=t.modules.filter.success,m=t.getField();if(t.modules.filter.headerElement&&t.modules.filter.headerElement.parentNode&&t.contentElement.removeChild(t.modules.filter.headerElement.parentNode),m){switch(t.modules.filter.emptyFunc=t.definition.headerFilterEmptyCheck||function(t){return!t&&"0"!==t},n=document.createElement("div"),n.classList.add("tabulator-header-filter"),_typeof(t.definition.headerFilter)){case"string":h.table.modules.edit.editors[t.definition.headerFilter]?(s=h.table.modules.edit.editors[t.definition.headerFilter],"tick"!==t.definition.headerFilter&&"tickCross"!==t.definition.headerFilter||t.definition.headerFilterEmptyCheck||(t.modules.filter.emptyFunc=function(t){return!0!==t&&!1!==t})):console.warn("Filter Error - Cannot build header filter, No such editor found: ",t.definition.editor);break;case"function":s=t.definition.headerFilter;break;case"boolean":t.modules.edit&&t.modules.edit.editor?s=t.modules.edit.editor:t.definition.formatter&&h.table.modules.edit.editors[t.definition.formatter]?(s=h.table.modules.edit.editors[t.definition.formatter],"tick"!==t.definition.formatter&&"tickCross"!==t.definition.formatter||t.definition.headerFilterEmptyCheck||(t.modules.filter.emptyFunc=function(t){return!0!==t&&!1!==t})):s=h.table.modules.edit.editors.input}if(s){if(a={getValue:function(){return void 0!==e?e:""},getField:function(){return t.definition.field},getElement:function(){return n},getColumn:function(){return t.getComponent()},getRow:function(){return{normalizeHeight:function(){}}}},u=t.definition.headerFilterParams||{},u="function"==typeof u?u.call(h.table):u,!(r=s.call(this.table.modules.edit,a,function(){},p,i,u)))return void console.warn("Filter Error - Cannot add filter to "+m+" column, editor returned a value of false");if(!(r instanceof Node))return void console.warn("Filter Error - Cannot add filter to "+m+" column, editor should return an instance of Node, the editor returned:",r);m?h.table.modules.localize.bind("headerFilters|columns|"+t.definition.field,function(t){r.setAttribute("placeholder",void 0!==t&&t?t:h.table.modules.localize.getText("headerFilters|default"))}):h.table.modules.localize.bind("headerFilters|default",function(t){r.setAttribute("placeholder",void 0!==h.column.definition.headerFilterPlaceholder&&h.column.definition.headerFilterPlaceholder?h.column.definition.headerFilterPlaceholder:t)}),r.addEventListener("click",function(t){t.stopPropagation(),r.focus()}),r.addEventListener("focus",function(t){var e=d.table.columnManager.element.scrollLeft;e!==d.table.rowManager.element.scrollLeft&&(d.table.rowManager.scrollHorizontal(e),d.table.columnManager.scrollHorizontal(e))}),l=!1,c=function(t){l&&clearTimeout(l),l=setTimeout(function(){p(r.value)},300)},t.modules.filter.headerElement=r,t.modules.filter.attrType=r.hasAttribute("type")?r.getAttribute("type").toLowerCase():"",t.modules.filter.tagType=r.tagName.toLowerCase(),!1!==t.definition.headerFilterLiveFilter&&("autocomplete"!==t.definition.headerFilter&&"tickCross"!==t.definition.headerFilter&&("autocomplete"!==t.definition.editor&&"tickCross"!==t.definition.editor||!0!==t.definition.headerFilter)&&(r.addEventListener("keyup",c),r.addEventListener("search",c),"number"==t.modules.filter.attrType&&r.addEventListener("change",function(t){p(r.value)}),"text"==t.modules.filter.attrType&&"ie"!==this.table.browser&&r.setAttribute("type","search")),"input"!=t.modules.filter.tagType&&"select"!=t.modules.filter.tagType&&"textarea"!=t.modules.filter.tagType||r.addEventListener("mousedown",function(t){t.stopPropagation()})),n.appendChild(r),t.contentElement.appendChild(n),o||h.headerFilterColumns.push(t)}}else console.warn("Filter Error - Cannot add header filter, column has no field set:",t.definition.title)},E.prototype.hideHeaderFilterElements=function(){this.headerFilterColumns.forEach(function(t){t.modules.filter&&t.modules.filter.headerElement&&(t.modules.filter.headerElement.style.display="none")})},E.prototype.showHeaderFilterElements=function(){this.headerFilterColumns.forEach(function(t){t.modules.filter&&t.modules.filter.headerElement&&(t.modules.filter.headerElement.style.display="")})},E.prototype.setHeaderFilterFocus=function(t){t.modules.filter&&t.modules.filter.headerElement?t.modules.filter.headerElement.focus():console.warn("Column Filter Focus Error - No header filter set on column:",t.getField())},E.prototype.setHeaderFilterValue=function(t,e){t&&(t.modules.filter&&t.modules.filter.headerElement?(this.generateHeaderFilterElement(t,e,!0),t.modules.filter.success(e)):console.warn("Column Filter Error - No header filter set on column:",t.getField()))},E.prototype.reloadHeaderFilter=function(t){t&&(t.modules.filter&&t.modules.filter.headerElement?this.generateHeaderFilterElement(t,t.modules.filter.value,!0):console.warn("Column Filter Error - No header filter set on column:",t.getField()))},E.prototype.hasChanged=function(){var t=this.changed;return this.changed=!1,t},E.prototype.setFilter=function(t,e,o){var i=this;i.filterList=[],Array.isArray(t)||(t=[{field:t,type:e,value:o}]),i.addFilter(t)},E.prototype.addFilter=function(t,e,o){var i=this;Array.isArray(t)||(t=[{field:t,type:e,value:o}]),t.forEach(function(t){(t=i.findFilter(t))&&(i.filterList.push(t),i.changed=!0)}),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.filter&&this.table.modules.persistence.save("filter")},E.prototype.findFilter=function(t){var e,o=this;if(Array.isArray(t))return this.findSubFilters(t);var i=!1;return"function"==typeof t.field?i=function(e){return t.field(e,t.type||{})}:o.filters[t.type]?(e=o.table.columnManager.getColumnByField(t.field),i=e?function(i){return o.filters[t.type](t.value,e.getFieldValue(i))}:function(e){return o.filters[t.type](t.value,e[t.field])}):console.warn("Filter Error - No such filter type found, ignoring: ",t.type),t.func=i,!!t.func&&t},E.prototype.findSubFilters=function(t){var e=this,o=[];return t.forEach(function(t){(t=e.findFilter(t))&&o.push(t)}),!!o.length&&o},E.prototype.getFilters=function(t,e){var o=[];return t&&(o=this.getHeaderFilters()),e&&o.forEach(function(t){"function"==typeof t.type&&(t.type="function")}),o=o.concat(this.filtersToArray(this.filterList,e))},E.prototype.filtersToArray=function(t,e){var o=this,i=[];return t.forEach(function(t){var n;Array.isArray(t)?i.push(o.filtersToArray(t,e)):(n={field:t.field,type:t.type,value:t.value},e&&"function"==typeof n.type&&(n.type="function"),i.push(n))}),i},E.prototype.getHeaderFilters=function(){var t=[];for(var e in this.headerFilters)t.push({field:e,type:this.headerFilters[e].type,value:this.headerFilters[e].value});return t},E.prototype.removeFilter=function(t,e,o){var i=this;Array.isArray(t)||(t=[{field:t,type:e,value:o}]),t.forEach(function(t){var e=-1;e="object"==_typeof(t.field)?i.filterList.findIndex(function(e){return t===e}):i.filterList.findIndex(function(e){return t.field===e.field&&t.type===e.type&&t.value===e.value}),e>-1?(i.filterList.splice(e,1),i.changed=!0):console.warn("Filter Error - No matching filter type found, ignoring: ",t.type)}),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.filter&&this.table.modules.persistence.save("filter")},E.prototype.clearFilter=function(t){this.filterList=[],t&&this.clearHeaderFilter(),this.changed=!0,this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.filter&&this.table.modules.persistence.save("filter")},E.prototype.clearHeaderFilter=function(){var t=this;this.headerFilters={},this.headerFilterColumns.forEach(function(e){e.modules.filter.value=null,e.modules.filter.prevSuccess=void 0,t.reloadHeaderFilter(e)}),this.changed=!0},E.prototype.search=function(t,e,o,i){var n=this,s=[],r=[];return Array.isArray(e)||(e=[{field:e,type:o,value:i}]),e.forEach(function(t){(t=n.findFilter(t))&&r.push(t)}),this.table.rowManager.rows.forEach(function(e){var o=!0;r.forEach(function(t){n.filterRecurse(t,e.getData())||(o=!1)}),o&&s.push("data"===t?e.getData("data"):e.getComponent())}),s},E.prototype.filter=function(t,e){var o=this,i=[],n=[];return o.table.options.dataFiltering&&o.table.options.dataFiltering.call(o.table,o.getFilters()),o.table.options.ajaxFiltering||!o.filterList.length&&!Object.keys(o.headerFilters).length?i=t.slice(0):t.forEach(function(t){o.filterRow(t)&&i.push(t)}),o.table.options.dataFiltered&&(i.forEach(function(t){n.push(t.getComponent())}),o.table.options.dataFiltered.call(o.table,o.getFilters(),n)),i},E.prototype.filterRow=function(t,e){var o=this,i=!0,n=t.getData();o.filterList.forEach(function(t){o.filterRecurse(t,n)||(i=!1)});for(var s in o.headerFilters)o.headerFilters[s].func(n)||(i=!1);return i},E.prototype.filterRecurse=function(t,e){var o=this,i=!1;return Array.isArray(t)?t.forEach(function(t){o.filterRecurse(t,e)&&(i=!0)}):i=t.func(e),i},E.prototype.filters={"=":function(t,e,o,i){return e==t},"<":function(t,e,o,i){return e<t},"<=":function(t,e,o,i){return e<=t},">":function(t,e,o,i){return e>t},">=":function(t,e,o,i){return e>=t},"!=":function(t,e,o,i){return e!=t},regex:function(t,e,o,i){return"string"==typeof t&&(t=new RegExp(t)),t.test(e)},like:function(t,e,o,i){return null===t||void 0===t?e===t:void 0!==e&&null!==e&&String(e).toLowerCase().indexOf(t.toLowerCase())>-1},in:function(t,e,o,i){return Array.isArray(t)?t.indexOf(e)>-1:(console.warn("Filter Error - filter value is not an array:",t),!1)}},u.prototype.registerModule("filter",E);var C=function(t){this.table=t};C.prototype.initializeColumn=function(t){var e=this,o={params:t.definition.formatterParams||{}};switch(_typeof(t.definition.formatter)){case"string":"tick"===t.definition.formatter&&(t.definition.formatter="tickCross",void 0===o.params.crossElement&&(o.params.crossElement=!1),console.warn("DEPRECATION WARNING - the tick formatter has been deprecated, please use the tickCross formatter with the crossElement param set to false")),e.formatters[t.definition.formatter]?o.formatter=e.formatters[t.definition.formatter]:(console.warn("Formatter Error - No such formatter found: ",t.definition.formatter),o.formatter=e.formatters.plaintext);break;case"function":o.formatter=t.definition.formatter;break;default:o.formatter=e.formatters.plaintext}t.modules.format=o},C.prototype.cellRendered=function(t){t.modules.format&&t.modules.format.renderedCallback&&t.modules.format.renderedCallback()},C.prototype.formatValue=function(t){function e(e){t.modules.format||(t.modules.format={}),t.modules.format.renderedCallback=e}var o=t.getComponent(),i="function"==typeof t.column.modules.format.params?t.column.modules.format.params(o):t.column.modules.format.params;return t.column.modules.format.formatter.call(this,o,i,e)},C.prototype.sanitizeHTML=function(t){if(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}return t},C.prototype.emptyToSpace=function(t){return null===t||void 0===t?"&nbsp;":t},C.prototype.getFormatter=function(t){var t;switch(void 0===t?"undefined":_typeof(t)){case"string":this.formatters[t]?t=this.formatters[t]:(console.warn("Formatter Error - No such formatter found: ",t),t=this.formatters.plaintext);break;case"function":t=t;break;default:t=this.formatters.plaintext}return t},C.prototype.formatters={plaintext:function(t,e,o){return this.emptyToSpace(this.sanitizeHTML(t.getValue()))},html:function(t,e,o){return t.getValue()},textarea:function(t,e,o){return t.getElement().style.whiteSpace="pre-wrap",this.emptyToSpace(this.sanitizeHTML(t.getValue()))},money:function(t,e,o){var i,n,s,r,a=parseFloat(t.getValue()),l=e.decimal||".",c=e.thousand||",",u=e.symbol||"",d=!!e.symbolAfter,h=void 0!==e.precision?e.precision:2;if(isNaN(a))return this.emptyToSpace(this.sanitizeHTML(t.getValue()));for(i=!1!==h?a.toFixed(h):a,i=String(i).split("."),n=i[0],s=i.length>1?l+i[1]:"",r=/(\d+)(\d{3})/;r.test(n);)n=n.replace(r,"$1"+c+"$2");return d?n+s+u:u+n+s},link:function(t,e,o){var i,n=t.getValue(),s=e.urlPrefix||"",r=e.download,a=n,l=document.createElement("a");if(e.labelField&&(i=t.getData(),a=i[e.labelField]),e.label)switch(_typeof(e.label)){case"string":a=e.label;break;case"function":a=e.label(t)}if(a){if(e.urlField&&(i=t.getData(),n=i[e.urlField]),e.url)switch(_typeof(e.url)){case"string":n=e.url;break;case"function":n=e.url(t)}return l.setAttribute("href",s+n),e.target&&l.setAttribute("target",e.target),e.download&&(r="function"==typeof r?r(t):!0===r?"":r,l.setAttribute("download",r)),l.innerHTML=this.emptyToSpace(this.sanitizeHTML(a)),l}return"&nbsp;"},image:function(t,e,o){var i=document.createElement("img");switch(i.setAttribute("src",t.getValue()),_typeof(e.height)){case"number":i.style.height=e.height+"px";break;case"string":i.style.height=e.height}switch(_typeof(e.width)){case"number":i.style.width=e.width+"px";break;case"string":i.style.width=e.width}return i.addEventListener("load",function(){t.getRow().normalizeHeight()}),i},tickCross:function(t,e,o){var i=t.getValue(),n=t.getElement(),s=e.allowEmpty,r=e.allowTruthy,a=void 0!==e.tickElement?e.tickElement:'<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',l=void 0!==e.crossElement?e.crossElement:'<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';return r&&i||!0===i||"true"===i||"True"===i||1===i||"1"===i?(n.setAttribute("aria-checked",!0),a||""):!s||"null"!==i&&""!==i&&null!==i&&void 0!==i?(n.setAttribute("aria-checked",!1),l||""):(n.setAttribute("aria-checked","mixed"),"")},datetime:function(t,e,o){var i=e.inputFormat||"YYYY-MM-DD hh:mm:ss",n=e.outputFormat||"DD/MM/YYYY hh:mm:ss",s=void 0!==e.invalidPlaceholder?e.invalidPlaceholder:"",r=t.getValue(),a=moment(r,i);return a.isValid()?a.format(n):!0===s?r:"function"==typeof s?s(r):s},datetimediff:function(t,e,o){var i=e.inputFormat||"YYYY-MM-DD hh:mm:ss",n=void 0!==e.invalidPlaceholder?e.invalidPlaceholder:"",s=void 0!==e.suffix&&e.suffix,r=void 0!==e.unit?e.unit:void 0,a=void 0!==e.humanize&&e.humanize,l=void 0!==e.date?e.date:moment(),c=t.getValue(),u=moment(c,i);return u.isValid()?a?moment.duration(u.diff(l)).humanize(s):u.diff(l,r)+(s?" "+s:""):!0===n?c:"function"==typeof n?n(c):n},lookup:function(t,e,o){var i=t.getValue();return void 0===e[i]?(console.warn("Missing display value for "+i),i):e[i]},star:function(t,e,o){var i=t.getValue(),n=t.getElement(),s=e&&e.stars?e.stars:5,r=document.createElement("span"),a=document.createElementNS("http://www.w3.org/2000/svg","svg");r.style.verticalAlign="middle",a.setAttribute("width","14"),a.setAttribute("height","14"),a.setAttribute("viewBox","0 0 512 512"),a.setAttribute("xml:space","preserve"),a.style.padding="0 1px",i=i&&!isNaN(i)?parseInt(i):0,i=Math.max(0,Math.min(i,s));for(var l=1;l<=s;l++){var c=a.cloneNode(!0);c.innerHTML=l<=i?'<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>':'<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',r.appendChild(c)}return n.style.whiteSpace="nowrap",n.style.overflow="hidden",n.style.textOverflow="ellipsis",n.setAttribute("aria-label",i),r},traffic:function(t,e,o){var i,n,s=this.sanitizeHTML(t.getValue())||0,r=document.createElement("span"),a=e&&e.max?e.max:100,l=e&&e.min?e.min:0,c=e&&void 0!==e.color?e.color:["red","orange","green"],u="#666666";if(!isNaN(s)&&void 0!==t.getValue()){switch(r.classList.add("tabulator-traffic-light"),n=parseFloat(s)<=a?parseFloat(s):a,n=parseFloat(n)>=l?parseFloat(n):l,i=(a-l)/100,n=Math.round((n-l)/i),void 0===c?"undefined":_typeof(c)){case"string":u=c;break;case"function":u=c(s);break;case"object":if(Array.isArray(c)){var d=100/c.length,h=Math.floor(n/d);h=Math.min(h,c.length-1),h=Math.max(h,0),u=c[h];break}}return r.style.backgroundColor=u,r}},progress:function(t,e,o){var i,n,s,r,a,l=this.sanitizeHTML(t.getValue())||0,c=t.getElement(),u=e&&e.max?e.max:100,d=e&&e.min?e.min:0,h=e&&e.legendAlign?e.legendAlign:"center";switch(n=parseFloat(l)<=u?parseFloat(l):u,n=parseFloat(n)>=d?parseFloat(n):d,i=(u-d)/100,n=Math.round((n-d)/i),_typeof(e.color)){case"string":s=e.color;break;case"function":s=e.color(l);break;case"object":if(Array.isArray(e.color)){var p=100/e.color.length,m=Math.floor(n/p);m=Math.min(m,e.color.length-1),m=Math.max(m,0),s=e.color[m];break}default:s="#2DC214"}switch(_typeof(e.legend)){case"string":r=e.legend;break;case"function":r=e.legend(l);break;case"boolean":r=l;break;default:r=!1}switch(_typeof(e.legendColor)){case"string":a=e.legendColor;break;case"function":a=e.legendColor(l);break;case"object":if(Array.isArray(e.legendColor)){var p=100/e.legendColor.length,m=Math.floor(n/p);m=Math.min(m,e.legendColor.length-1),m=Math.max(m,0),a=e.legendColor[m]}break;default:a="#000"}c.style.minWidth="30px",c.style.position="relative",c.setAttribute("aria-label",n);var f=document.createElement("div");if(f.style.display="inline-block",f.style.position="relative",f.style.width=n+"%",f.style.backgroundColor=s,f.style.height="100%",f.setAttribute("data-max",u),f.setAttribute("data-min",d),r){var g=document.createElement("div");g.style.position="absolute",g.style.top="4px",g.style.left=0,g.style.textAlign=h,g.style.width="100%",g.style.color=a,g.innerHTML=r}return o(function(){c.appendChild(f),r&&c.appendChild(g)}),""},color:function(t,e,o){return t.getElement().style.backgroundColor=this.sanitizeHTML(t.getValue()),""},buttonTick:function(t,e,o){return'<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>'},buttonCross:function(t,e,o){return'<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>'},rownum:function(t,e,o){return this.table.rowManager.activeRows.indexOf(t.getRow()._getSelf())+1},handle:function(t,e,o){return t.getElement().classList.add("tabulator-row-handle"),"<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>"},responsiveCollapse:function(t,e,o){function i(t){var e=s.element;s.open=t,e&&(s.open?(n.classList.add("open"),e.style.display=""):(n.classList.remove("open"),e.style.display="none"))}var n=document.createElement("div"),s=t.getRow()._row.modules.responsiveLayout;return n.classList.add("tabulator-responsive-collapse-toggle"),n.innerHTML="<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>",t.getElement().classList.add("tabulator-row-handle"),n.addEventListener("click",function(t){t.stopImmediatePropagation(),i(!s.open)}),i(s.open),n},rowSelection:function(t){var e=this,o=document.createElement("input");if(o.type="checkbox",this.table.modExists("selectRow",!0))if(o.addEventListener("click",function(t){t.stopPropagation()}),"function"==typeof t.getRow){var i=t.getRow();o.addEventListener("change",function(t){i.toggleSelect()}),o.checked=i.isSelected(),this.table.modules.selectRow.registerRowSelectCheckbox(i,o)}else o.addEventListener("change",function(t){e.table.modules.selectRow.selectedRows.length?e.table.deselectRow():e.table.selectRow()}),this.table.modules.selectRow.registerHeaderSelectCheckbox(o);return o}},u.prototype.registerModule("format",C);var R=function(t){this.table=t,this.leftColumns=[],this.rightColumns=[],this.leftMargin=0,this.rightMargin=0,this.rightPadding=0,this.initializationMode="left",this.active=!1,this.scrollEndTimer=!1};R.prototype.reset=function(){this.initializationMode="left",this.leftColumns=[],this.rightColumns=[],this.leftMargin=0,this.rightMargin=0,this.rightMargin=0,this.active=!1,this.table.columnManager.headersElement.style.marginLeft=0,this.table.columnManager.element.style.paddingRight=0},R.prototype.initializeColumn=function(t){var e={margin:0,edge:!1};t.definition.frozen?t.parent.isGroup?console.warn("Frozen Column Error - Grouped columns cannot be frozen"):t.isGroup?console.warn("Frozen Column Error - Column Groups cannot be frozen"):(e.position=this.initializationMode,"left"==this.initializationMode?this.leftColumns.push(t):this.rightColumns.unshift(t),this.active=!0,t.modules.frozen=e):this.initializationMode="right"},R.prototype.scrollHorizontal=function(){var t,e=this;this.active&&(clearTimeout(this.scrollEndTimer),this.scrollEndTimer=setTimeout(function(){e.layout()},100),t=this.table.rowManager.getVisibleRows(),this.calcMargins(),this.layoutColumnPosition(),this.layoutCalcRows(),t.forEach(function(t){"row"===t.type&&e.layoutRow(t)}),this.table.rowManager.tableElement.style.marginRight=this.rightMargin)},R.prototype.calcMargins=function(){this.leftMargin=this._calcSpace(this.leftColumns,this.leftColumns.length)+"px",this.table.columnManager.headersElement.style.marginLeft=this.leftMargin,this.rightMargin=this._calcSpace(this.rightColumns,this.rightColumns.length)+"px",this.table.columnManager.element.style.paddingRight=this.rightMargin,this.rightPadding=this.table.rowManager.element.clientWidth+this.table.columnManager.scrollLeft},R.prototype.layoutCalcRows=function(){this.table.modExists("columnCalcs")&&(this.table.modules.columnCalcs.topInitialized&&this.table.modules.columnCalcs.topRow&&this.layoutRow(this.table.modules.columnCalcs.topRow),this.table.modules.columnCalcs.botInitialized&&this.table.modules.columnCalcs.botRow&&this.layoutRow(this.table.modules.columnCalcs.botRow))},R.prototype.layoutColumnPosition=function(t){var e=this;this.leftColumns.forEach(function(o,i){o.modules.frozen.margin=e._calcSpace(e.leftColumns,i)+e.table.columnManager.scrollLeft+"px",i==e.leftColumns.length-1?o.modules.frozen.edge=!0:o.modules.frozen.edge=!1,e.layoutElement(o.getElement(),o),t&&o.cells.forEach(function(t){e.layoutElement(t.getElement(),o)})}),this.rightColumns.forEach(function(o,i){o.modules.frozen.margin=e.rightPadding-e._calcSpace(e.rightColumns,i+1)+"px",i==e.rightColumns.length-1?o.modules.frozen.edge=!0:o.modules.frozen.edge=!1,e.layoutElement(o.getElement(),o),t&&o.cells.forEach(function(t){e.layoutElement(t.getElement(),o)})})},R.prototype.layout=function(){var t=this;t.active&&(this.calcMargins(),t.table.rowManager.getDisplayRows().forEach(function(e){"row"===e.type&&t.layoutRow(e)}),this.layoutCalcRows(),this.layoutColumnPosition(!0),this.table.rowManager.tableElement.style.marginRight=this.rightMargin)},R.prototype.layoutRow=function(t){var e=this;t.getElement().style.paddingLeft=this.leftMargin,this.leftColumns.forEach(function(o){var i=t.getCell(o);i&&e.layoutElement(i.getElement(),o)}),this.rightColumns.forEach(function(o){var i=t.getCell(o);i&&e.layoutElement(i.getElement(),o)})},R.prototype.layoutElement=function(t,e){e.modules.frozen&&(t.style.position="absolute",t.style.left=e.modules.frozen.margin,t.classList.add("tabulator-frozen"),e.modules.frozen.edge&&t.classList.add("tabulator-frozen-"+e.modules.frozen.position))},R.prototype._calcSpace=function(t,e){for(var o=0,i=0;i<e;i++)t[i].visible&&(o+=t[i].getWidth());return o},u.prototype.registerModule("frozenColumns",R);var x=function(t){this.table=t,this.topElement=document.createElement("div"),this.rows=[],this.displayIndex=0};x.prototype.initialize=function(){this.rows=[],this.topElement.classList.add("tabulator-frozen-rows-holder"),this.table.columnManager.getElement().insertBefore(this.topElement,this.table.columnManager.headersElement.nextSibling)},x.prototype.setDisplayIndex=function(t){this.displayIndex=t},x.prototype.getDisplayIndex=function(){return this.displayIndex},x.prototype.isFrozen=function(){return!!this.rows.length},x.prototype.getRows=function(t){var e=t.slice(0);return this.rows.forEach(function(t){var o=e.indexOf(t);o>-1&&e.splice(o,1)}),e},x.prototype.freezeRow=function(t){t.modules.frozen?console.warn("Freeze Error - Row is already frozen"):(t.modules.frozen=!0,this.topElement.appendChild(t.getElement()),t.initialize(),t.normalizeHeight(),this.table.rowManager.adjustTableSize(),this.rows.push(t),this.table.rowManager.refreshActiveData("display"),this.styleRows())},x.prototype.unfreezeRow=function(t){var e=this.rows.indexOf(t);if(t.modules.frozen){t.modules.frozen=!1;var o=t.getElement();o.parentNode.removeChild(o),this.table.rowManager.adjustTableSize(),this.rows.splice(e,1),this.table.rowManager.refreshActiveData("display"),this.rows.length&&this.styleRows()}else console.warn("Freeze Error - Row is already unfrozen")},x.prototype.styleRows=function(t){var e=this;this.rows.forEach(function(t,o){e.table.rowManager.styleRow(t,o)})},u.prototype.registerModule("frozenRows",x);var M=function(t){this._group=t,this.type="GroupComponent"};M.prototype.getKey=function(){return this._group.key},M.prototype.getField=function(){return this._group.field},M.prototype.getElement=function(){return this._group.element},M.prototype.getRows=function(){return this._group.getRows(!0)},M.prototype.getSubGroups=function(){return this._group.getSubGroups(!0)},M.prototype.getParentGroup=function(){return!!this._group.parent&&this._group.parent.getComponent()},M.prototype.getVisibility=function(){return this._group.visible},M.prototype.show=function(){this._group.show()},M.prototype.hide=function(){this._group.hide()},M.prototype.toggle=function(){this._group.toggleVisibility()},M.prototype._getSelf=function(){return this._group},M.prototype.getTable=function(){return this._group.groupManager.table};var D=function(t,e,o,i,n,s,r){this.groupManager=t,this.parent=e,this.key=i,this.level=o,this.field=n,this.hasSubGroups=o<t.groupIDLookups.length-1,this.addRow=this.hasSubGroups?this._addRowToGroup:this._addRow,this.type="group",this.old=r,this.rows=[],this.groups=[],this.groupList=[],this.generator=s,this.elementContents=!1,this.height=0,this.outerHeight=0,this.initialized=!1,this.calcs={},this.initialized=!1,this.modules={},this.arrowElement=!1,this.visible=r?r.visible:void 0!==t.startOpen[o]?t.startOpen[o]:t.startOpen[0],this.createElements(),this.addBindings(),this.createValueGroups()};D.prototype.wipe=function(){this.groupList.length?this.groupList.forEach(function(t){t.wipe()}):(this.element=!1,this.arrowElement=!1,this.elementContents=!1)},D.prototype.createElements=function(){var t=document.createElement("div");t.classList.add("tabulator-arrow"),this.element=document.createElement("div"),this.element.classList.add("tabulator-row"),this.element.classList.add("tabulator-group"),this.element.classList.add("tabulator-group-level-"+this.level),this.element.setAttribute("role","rowgroup"),this.arrowElement=document.createElement("div"),this.arrowElement.classList.add("tabulator-group-toggle"),this.arrowElement.appendChild(t),!1!==this.groupManager.table.options.movableRows&&this.groupManager.table.modExists("moveRow")&&this.groupManager.table.modules.moveRow.initializeGroupHeader(this)},D.prototype.createValueGroups=function(){var t=this,e=this.level+1;this.groupManager.allowedValues&&this.groupManager.allowedValues[e]&&this.groupManager.allowedValues[e].forEach(function(o){t._createGroup(o,e)})},
D.prototype.addBindings=function(){var t,e,o,i,n=this;n.groupManager.table.options.groupClick&&n.element.addEventListener("click",function(t){n.groupManager.table.options.groupClick.call(n.groupManager.table,t,n.getComponent())}),n.groupManager.table.options.groupDblClick&&n.element.addEventListener("dblclick",function(t){n.groupManager.table.options.groupDblClick.call(n.groupManager.table,t,n.getComponent())}),n.groupManager.table.options.groupContext&&n.element.addEventListener("contextmenu",function(t){n.groupManager.table.options.groupContext.call(n.groupManager.table,t,n.getComponent())}),n.groupManager.table.options.groupTap&&(o=!1,n.element.addEventListener("touchstart",function(t){o=!0},{passive:!0}),n.element.addEventListener("touchend",function(t){o&&n.groupManager.table.options.groupTap(t,n.getComponent()),o=!1})),n.groupManager.table.options.groupDblTap&&(t=null,n.element.addEventListener("touchend",function(e){t?(clearTimeout(t),t=null,n.groupManager.table.options.groupDblTap(e,n.getComponent())):t=setTimeout(function(){clearTimeout(t),t=null},300)})),n.groupManager.table.options.groupTapHold&&(e=null,n.element.addEventListener("touchstart",function(t){clearTimeout(e),e=setTimeout(function(){clearTimeout(e),e=null,o=!1,n.groupManager.table.options.groupTapHold(t,n.getComponent())},1e3)},{passive:!0}),n.element.addEventListener("touchend",function(t){clearTimeout(e),e=null})),n.groupManager.table.options.groupToggleElement&&(i="arrow"==n.groupManager.table.options.groupToggleElement?n.arrowElement:n.element,i.addEventListener("click",function(t){t.stopPropagation(),t.stopImmediatePropagation(),n.toggleVisibility()}))},D.prototype._createGroup=function(t,e){var o=e+"_"+t,i=new D(this.groupManager,this,e,t,this.groupManager.groupIDLookups[e].field,this.groupManager.headerGenerator[e]||this.groupManager.headerGenerator[0],!!this.old&&this.old.groups[o]);this.groups[o]=i,this.groupList.push(i)},D.prototype._addRowToGroup=function(t){var e=this.level+1;if(this.hasSubGroups){var o=this.groupManager.groupIDLookups[e].func(t.getData()),i=e+"_"+o;this.groupManager.allowedValues&&this.groupManager.allowedValues[e]?this.groups[i]&&this.groups[i].addRow(t):(this.groups[i]||this._createGroup(o,e),this.groups[i].addRow(t))}},D.prototype._addRow=function(t){this.rows.push(t),t.modules.group=this},D.prototype.insertRow=function(t,e,o){var i=this.conformRowData({});t.updateData(i);var n=this.rows.indexOf(e);n>-1?o?this.rows.splice(n+1,0,t):this.rows.splice(n,0,t):o?this.rows.push(t):this.rows.unshift(t),t.modules.group=this,this.generateGroupHeaderContents(),this.groupManager.table.modExists("columnCalcs")&&"table"!=this.groupManager.table.options.columnCalcs&&this.groupManager.table.modules.columnCalcs.recalcGroup(this),this.groupManager.updateGroupRows(!0)},D.prototype.scrollHeader=function(t){this.arrowElement.style.marginLeft=t,this.groupList.forEach(function(e){e.scrollHeader(t)})},D.prototype.getRowIndex=function(t){},D.prototype.conformRowData=function(t){return this.field?t[this.field]=this.key:console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function"),this.parent&&(t=this.parent.conformRowData(t)),t},D.prototype.removeRow=function(t){var e=this.rows.indexOf(t),o=t.getElement();e>-1&&this.rows.splice(e,1),this.groupManager.table.options.groupValues||this.rows.length?(o.parentNode&&o.parentNode.removeChild(o),this.generateGroupHeaderContents(),this.groupManager.table.modExists("columnCalcs")&&"table"!=this.groupManager.table.options.columnCalcs&&this.groupManager.table.modules.columnCalcs.recalcGroup(this)):(this.parent?this.parent.removeGroup(this):this.groupManager.removeGroup(this),this.groupManager.updateGroupRows(!0))},D.prototype.removeGroup=function(t){var e,o=t.level+"_"+t.key;this.groups[o]&&(delete this.groups[o],e=this.groupList.indexOf(t),e>-1&&this.groupList.splice(e,1),this.groupList.length||(this.parent?this.parent.removeGroup(this):this.groupManager.removeGroup(this)))},D.prototype.getHeadersAndRows=function(t){var e=[];return e.push(this),this._visSet(),this.visible?this.groupList.length?this.groupList.forEach(function(o){e=e.concat(o.getHeadersAndRows(t))}):(!t&&"table"!=this.groupManager.table.options.columnCalcs&&this.groupManager.table.modExists("columnCalcs")&&this.groupManager.table.modules.columnCalcs.hasTopCalcs()&&(this.calcs.top&&(this.calcs.top.detachElement(),this.calcs.top.deleteCells()),this.calcs.top=this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows),e.push(this.calcs.top)),e=e.concat(this.rows),!t&&"table"!=this.groupManager.table.options.columnCalcs&&this.groupManager.table.modExists("columnCalcs")&&this.groupManager.table.modules.columnCalcs.hasBottomCalcs()&&(this.calcs.bottom&&(this.calcs.bottom.detachElement(),this.calcs.bottom.deleteCells()),this.calcs.bottom=this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows),e.push(this.calcs.bottom))):this.groupList.length||"table"==this.groupManager.table.options.columnCalcs||this.groupManager.table.modExists("columnCalcs")&&(!t&&this.groupManager.table.modules.columnCalcs.hasTopCalcs()&&(this.calcs.top&&(this.calcs.top.detachElement(),this.calcs.top.deleteCells()),this.groupManager.table.options.groupClosedShowCalcs&&(this.calcs.top=this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows),e.push(this.calcs.top))),!t&&this.groupManager.table.modules.columnCalcs.hasBottomCalcs()&&(this.calcs.bottom&&(this.calcs.bottom.detachElement(),this.calcs.bottom.deleteCells()),this.groupManager.table.options.groupClosedShowCalcs&&(this.calcs.bottom=this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows),e.push(this.calcs.bottom)))),e},D.prototype.getData=function(t,e){var o=[];return this._visSet(),(!t||t&&this.visible)&&this.rows.forEach(function(t){o.push(t.getData(e||"data"))}),o},D.prototype.getRowCount=function(){var t=0;return this.groupList.length?this.groupList.forEach(function(e){t+=e.getRowCount()}):t=this.rows.length,t},D.prototype.toggleVisibility=function(){this.visible?this.hide():this.show()},D.prototype.hide=function(){this.visible=!1,"classic"!=this.groupManager.table.rowManager.getRenderMode()||this.groupManager.table.options.pagination?this.groupManager.updateGroupRows(!0):(this.element.classList.remove("tabulator-group-visible"),this.groupList.length?this.groupList.forEach(function(t){t.getHeadersAndRows().forEach(function(t){t.detachElement()})}):this.rows.forEach(function(t){var e=t.getElement();e.parentNode.removeChild(e)}),this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(),this.groupManager.getDisplayIndex()),this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth()),this.groupManager.table.options.groupVisibilityChanged.call(this.table,this.getComponent(),!1)},D.prototype.show=function(){var t=this;if(t.visible=!0,"classic"!=this.groupManager.table.rowManager.getRenderMode()||this.groupManager.table.options.pagination)this.groupManager.updateGroupRows(!0);else{this.element.classList.add("tabulator-group-visible");var e=t.getElement();this.groupList.length?this.groupList.forEach(function(t){t.getHeadersAndRows().forEach(function(t){var o=t.getElement();e.parentNode.insertBefore(o,e.nextSibling),t.initialize(),e=o})}):t.rows.forEach(function(t){var o=t.getElement();e.parentNode.insertBefore(o,e.nextSibling),t.initialize(),e=o}),this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(),this.groupManager.getDisplayIndex()),this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth()}this.groupManager.table.options.groupVisibilityChanged.call(this.table,this.getComponent(),!0)},D.prototype._visSet=function(){var t=[];"function"==typeof this.visible&&(this.rows.forEach(function(e){t.push(e.getData())}),this.visible=this.visible(this.key,this.getRowCount(),t,this.getComponent()))},D.prototype.getRowGroup=function(t){var e=!1;return this.groupList.length?this.groupList.forEach(function(o){var i=o.getRowGroup(t);i&&(e=i)}):this.rows.find(function(e){return e===t})&&(e=this),e},D.prototype.getSubGroups=function(t){var e=[];return this.groupList.forEach(function(o){e.push(t?o.getComponent():o)}),e},D.prototype.getRows=function(t){var e=[];return this.rows.forEach(function(o){e.push(t?o.getComponent():o)}),e},D.prototype.generateGroupHeaderContents=function(){var t=[];for(this.rows.forEach(function(e){t.push(e.getData())}),this.elementContents=this.generator(this.key,this.getRowCount(),t,this.getComponent());this.element.firstChild;)this.element.removeChild(this.element.firstChild);"string"==typeof this.elementContents?this.element.innerHTML=this.elementContents:this.element.appendChild(this.elementContents),this.element.insertBefore(this.arrowElement,this.element.firstChild)},D.prototype.getElement=function(){this.addBindingsd=!1,this._visSet(),this.visible?this.element.classList.add("tabulator-group-visible"):this.element.classList.remove("tabulator-group-visible");for(var t=0;t<this.element.childNodes.length;++t)this.element.childNodes[t].parentNode.removeChild(this.element.childNodes[t]);return this.generateGroupHeaderContents(),this.element},D.prototype.detachElement=function(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)},D.prototype.normalizeHeight=function(){this.setHeight(this.element.clientHeight)},D.prototype.initialize=function(t){this.initialized&&!t||(this.normalizeHeight(),this.initialized=!0)},D.prototype.reinitialize=function(){this.initialized=!1,this.height=0,u.prototype.helpers.elVisible(this.element)&&this.initialize(!0)},D.prototype.setHeight=function(t){this.height!=t&&(this.height=t,this.outerHeight=this.element.offsetHeight)},D.prototype.getHeight=function(){return this.outerHeight},D.prototype.getGroup=function(){return this},D.prototype.reinitializeHeight=function(){},D.prototype.calcHeight=function(){},D.prototype.setCellHeight=function(){},D.prototype.clearCellHeight=function(){},D.prototype.getComponent=function(){return new M(this)};var L=function(t){this.table=t,this.groupIDLookups=!1,this.startOpen=[function(){return!1}],this.headerGenerator=[function(){return""}],this.groupList=[],this.allowedValues=!1,this.groups={},this.displayIndex=0};L.prototype.initialize=function(){var t=this,e=t.table.options.groupBy,o=t.table.options.groupStartOpen,i=t.table.options.groupHeader;if(this.allowedValues=t.table.options.groupValues,Array.isArray(e)&&Array.isArray(i)&&e.length>i.length&&console.warn("Error creating group headers, groupHeader array is shorter than groupBy array"),t.headerGenerator=[function(){return""}],this.startOpen=[function(){return!1}],t.table.modules.localize.bind("groups|item",function(e,o){t.headerGenerator[0]=function(t,i,n){return(void 0===t?"":t)+"<span>("+i+" "+(1===i?e:o.groups.items)+")</span>"}}),this.groupIDLookups=[],Array.isArray(e)||e)this.table.modExists("columnCalcs")&&"table"!=this.table.options.columnCalcs&&"both"!=this.table.options.columnCalcs&&this.table.modules.columnCalcs.removeCalcs();else if(this.table.modExists("columnCalcs")&&"group"!=this.table.options.columnCalcs){var n=this.table.columnManager.getRealColumns();n.forEach(function(e){e.definition.topCalc&&t.table.modules.columnCalcs.initializeTopRow(),e.definition.bottomCalc&&t.table.modules.columnCalcs.initializeBottomRow()})}Array.isArray(e)||(e=[e]),e.forEach(function(e,o){var i,n;"function"==typeof e?i=e:(n=t.table.columnManager.getColumnByField(e),i=n?function(t){return n.getFieldValue(t)}:function(t){return t[e]}),t.groupIDLookups.push({field:"function"!=typeof e&&e,func:i,values:!!t.allowedValues&&t.allowedValues[o]})}),o&&(Array.isArray(o)||(o=[o]),o.forEach(function(t){t="function"==typeof t?t:function(){return!0}}),t.startOpen=o),i&&(t.headerGenerator=Array.isArray(i)?i:[i]),this.initialized=!0},L.prototype.setDisplayIndex=function(t){this.displayIndex=t},L.prototype.getDisplayIndex=function(){return this.displayIndex},L.prototype.getRows=function(t){return this.groupIDLookups.length?(this.table.options.dataGrouping.call(this.table),this.generateGroups(t),this.table.options.dataGrouped&&this.table.options.dataGrouped.call(this.table,this.getGroups(!0)),this.updateGroupRows()):t.slice(0)},L.prototype.getGroups=function(t){var e=[];return this.groupList.forEach(function(o){e.push(t?o.getComponent():o)}),e},L.prototype.wipe=function(){this.groupList.forEach(function(t){t.wipe()})},L.prototype.pullGroupListData=function(t){var e=this,o=[];return t.forEach(function(t){var i={};i.level=0,i.rowCount=0,i.headerContent="";var n=[];t.hasSubGroups?(n=e.pullGroupListData(t.groupList),i.level=t.level,i.rowCount=n.length-t.groupList.length,i.headerContent=t.generator(t.key,i.rowCount,t.rows,t),o.push(i),o=o.concat(n)):(i.level=t.level,i.headerContent=t.generator(t.key,t.rows.length,t.rows,t),i.rowCount=t.getRows().length,o.push(i),t.getRows().forEach(function(t){o.push(t.getData("data"))}))}),o},L.prototype.getGroupedData=function(){return this.pullGroupListData(this.groupList)},L.prototype.getRowGroup=function(t){var e=!1;return this.groupList.forEach(function(o){var i=o.getRowGroup(t);i&&(e=i)}),e},L.prototype.countGroups=function(){return this.groupList.length},L.prototype.generateGroups=function(t){var e=this,o=e.groups;e.groups={},e.groupList=[],this.allowedValues&&this.allowedValues[0]?(this.allowedValues[0].forEach(function(t){e.createGroup(t,0,o)}),t.forEach(function(t){e.assignRowToExistingGroup(t,o)})):t.forEach(function(t){e.assignRowToGroup(t,o)})},L.prototype.createGroup=function(t,e,o){var i,n=e+"_"+t;o=o||[],i=new D(this,!1,e,t,this.groupIDLookups[0].field,this.headerGenerator[0],o[n]),this.groups[n]=i,this.groupList.push(i)},L.prototype.assignRowToExistingGroup=function(t,e){var o=this.groupIDLookups[0].func(t.getData()),i="0_"+o;this.groups[i]&&this.groups[i].addRow(t)},L.prototype.assignRowToGroup=function(t,e){var o=this.groupIDLookups[0].func(t.getData()),i=!this.groups["0_"+o];return i&&this.createGroup(o,0,e),this.groups["0_"+o].addRow(t),!i},L.prototype.updateGroupRows=function(t){var e=this,o=[];if(e.groupList.forEach(function(t){o=o.concat(t.getHeadersAndRows())}),t){var i=e.table.rowManager.setDisplayRows(o,this.getDisplayIndex());!0!==i&&this.setDisplayIndex(i),e.table.rowManager.refreshActiveData("group",!0,!0)}return o},L.prototype.scrollHeaders=function(t){t+="px",this.groupList.forEach(function(e){e.scrollHeader(t)})},L.prototype.removeGroup=function(t){var e,o=t.level+"_"+t.key;this.groups[o]&&(delete this.groups[o],(e=this.groupList.indexOf(t))>-1&&this.groupList.splice(e,1))},u.prototype.registerModule("groupRows",L);var T=function(t){this.table=t,this.history=[],this.index=-1};T.prototype.clear=function(){this.history=[],this.index=-1},T.prototype.action=function(t,e,o){this.history=this.history.slice(0,this.index+1),this.history.push({type:t,component:e,data:o}),this.index++},T.prototype.getHistoryUndoSize=function(){return this.index+1},T.prototype.getHistoryRedoSize=function(){return this.history.length-(this.index+1)},T.prototype.undo=function(){if(this.index>-1){var t=this.history[this.index];return this.undoers[t.type].call(this,t),this.index--,this.table.options.historyUndo.call(this.table,t.type,t.component.getComponent(),t.data),!0}return console.warn("History Undo Error - No more history to undo"),!1},T.prototype.redo=function(){if(this.history.length-1>this.index){this.index++;var t=this.history[this.index];return this.redoers[t.type].call(this,t),this.table.options.historyRedo.call(this.table,t.type,t.component.getComponent(),t.data),!0}return console.warn("History Redo Error - No more history to redo"),!1},T.prototype.undoers={cellEdit:function(t){t.component.setValueProcessData(t.data.oldValue)},rowAdd:function(t){t.component.deleteActual()},rowDelete:function(t){var e=this.table.rowManager.addRowActual(t.data.data,t.data.pos,t.data.index);this.table.options.groupBy&&this.table.modExists("groupRows")&&this.table.modules.groupRows.updateGroupRows(!0),this._rebindRow(t.component,e)},rowMove:function(t){this.table.rowManager.moveRowActual(t.component,this.table.rowManager.rows[t.data.pos],!1),this.table.rowManager.redraw()}},T.prototype.redoers={cellEdit:function(t){t.component.setValueProcessData(t.data.newValue)},rowAdd:function(t){var e=this.table.rowManager.addRowActual(t.data.data,t.data.pos,t.data.index);this.table.options.groupBy&&this.table.modExists("groupRows")&&this.table.modules.groupRows.updateGroupRows(!0),this._rebindRow(t.component,e)},rowDelete:function(t){t.component.deleteActual()},rowMove:function(t){this.table.rowManager.moveRowActual(t.component,this.table.rowManager.rows[t.data.pos],!1),this.table.rowManager.redraw()}},T.prototype._rebindRow=function(t,e){this.history.forEach(function(o){if(o.component instanceof r)o.component===t&&(o.component=e);else if(o.component instanceof l&&o.component.row===t){var i=o.component.column.getField();i&&(o.component=e.getCell(i))}})},u.prototype.registerModule("history",T);var k=function(t){this.table=t,this.fieldIndex=[],this.hasIndex=!1};k.prototype.parseTable=function(){var t=this,e=t.table.element,o=t.table.options,i=(o.columns,e.getElementsByTagName("th")),n=e.getElementsByTagName("tbody")[0],s=[];t.hasIndex=!1,t.table.options.htmlImporting.call(this.table),n=n?n.getElementsByTagName("tr"):[],t._extractOptions(e,o),i.length?t._extractHeaders(i,n):t._generateBlankHeaders(i,n);for(var r=0;r<n.length;r++){var a=n[r],l=a.getElementsByTagName("td"),c={};t.hasIndex||(c[o.index]=r);for(var u=0;u<l.length;u++){var d=l[u];void 0!==this.fieldIndex[u]&&(c[this.fieldIndex[u]]=d.innerHTML)}s.push(c)}var h=document.createElement("div"),p=e.attributes;for(var u in p)"object"==_typeof(p[u])&&h.setAttribute(p[u].name,p[u].value);e.parentNode.replaceChild(h,e),o.data=s,t.table.options.htmlImported.call(this.table),this.table.element=h},k.prototype._extractOptions=function(t,e,o){var i=t.attributes,n=o?Object.assign([],o):Object.keys(e),s={};n.forEach(function(t){s[t.toLowerCase()]=t});for(var r in i){var a,l=i[r];l&&"object"==(void 0===l?"undefined":_typeof(l))&&l.name&&0===l.name.indexOf("tabulator-")&&(a=l.name.replace("tabulator-",""),void 0!==s[a]&&(e[s[a]]=this._attribValue(l.value)))}},k.prototype._attribValue=function(t){return"true"===t||"false"!==t&&t},k.prototype._findCol=function(t){return this.table.options.columns.find(function(e){return e.title===t})||!1},k.prototype._extractHeaders=function(t,e){for(var o=0;o<t.length;o++){var n,s,r=t[o],a=!1,l=this._findCol(r.textContent);l?a=!0:l={title:r.textContent.trim()},l.field||(l.field=r.textContent.trim().toLowerCase().replace(" ","_")),n=r.getAttribute("width"),n&&!l.width&&(l.width=n),s=r.attributes,this._extractOptions(r,l,i.prototype.defaultOptionList);for(var c in s){var u,d=s[c];d&&"object"==(void 0===d?"undefined":_typeof(d))&&d.name&&0===d.name.indexOf("tabulator-")&&(u=d.name.replace("tabulator-",""),l[u]=this._attribValue(d.value))}this.fieldIndex[o]=l.field,l.field==this.table.options.index&&(this.hasIndex=!0),a||this.table.options.columns.push(l)}},k.prototype._generateBlankHeaders=function(t,e){for(var o=0;o<t.length;o++){var i=t[o],n={title:"",field:"col"+o};this.fieldIndex[o]=n.field;var s=i.getAttribute("width");s&&(n.width=s),this.table.options.columns.push(n)}},u.prototype.registerModule("htmlTableImport",k);var S=function(t){this.table=t,this.config={},this.cloneTableStyle=!0,this.colVisProp=""};S.prototype.genereateTable=function(t,e,o,i){this.cloneTableStyle=e,this.config=t||{},this.colVisProp=i;var n=this.generateHeaderElements(),s=this.generateBodyElements(o),r=document.createElement("table");return r.classList.add("tabulator-print-table"),r.appendChild(n),r.appendChild(s),this.mapElementStyles(this.table.element,r,["border-top","border-left","border-right","border-bottom"]),r},S.prototype.generateColumnGroupHeaders=function(){var t=this,e=[];return(!1!==this.config.columnGroups?this.table.columnManager.columns:this.table.columnManager.columnsByIndex).forEach(function(o){var i=t.processColumnGroup(o);i&&e.push(i)}),e},S.prototype.processColumnGroup=function(t){var e=this,o=t.columns,i=0,n={title:t.definition.title,column:t,depth:1};if(o.length){if(n.subGroups=[],n.width=0,o.forEach(function(t){var o=e.processColumnGroup(t);o&&(n.width+=o.width,n.subGroups.push(o),o.depth>i&&(i=o.depth))}),n.depth+=i,!n.width)return!1}else{if(!this.columnVisCheck(t))return!1;n.width=1}return n},S.prototype.groupHeadersToRows=function(t){function e(t,n){var s=i-n;void 0===o[n]&&(o[n]=[]),t.height=t.subGroups?1:s-t.depth+1,o[n].push(t),t.subGroups&&t.subGroups.forEach(function(t){e(t,n+1)})}var o=[],i=0;return t.forEach(function(t){t.depth>i&&(i=t.depth)}),t.forEach(function(t){e(t,0)}),o},S.prototype.generateHeaderElements=function(){var t=this,e=document.createElement("thead");return this.groupHeadersToRows(this.generateColumnGroupHeaders()).forEach(function(o){var i=document.createElement("tr");t.mapElementStyles(t.table.columnManager.getHeadersElement(),e,["border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),o.forEach(function(e){var o=document.createElement("th"),n=e.column.definition.cssClass?e.column.definition.cssClass.split(" "):[];o.colSpan=e.width,o.rowSpan=e.height,o.innerHTML=e.column.definition.title,t.cloneTableStyle&&(o.style.boxSizing="border-box"),n.forEach(function(t){o.classList.add(t)}),t.mapElementStyles(e.column.getElement(),o,["text-align","border-top","border-left","border-right","border-bottom","background-color","color","font-weight","font-family","font-size"]),t.mapElementStyles(e.column.contentElement,o,["padding-top","padding-left","padding-right","padding-bottom"]),e.column.visible?t.mapElementStyles(e.column.getElement(),o,["width"]):e.column.definition.width&&(o.style.width=e.column.definition.width+"px"),e.column.parent&&t.mapElementStyles(e.column.parent.groupElement,o,["border-top"]),i.appendChild(o)}),e.appendChild(i)}),e},S.prototype.generateBodyElements=function(t){var e,o,i,n,s,r,a,l,c=this;this.cloneTableStyle&&window.getComputedStyle&&(e=this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)"),o=this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)"),i=this.table.element.querySelector(".tabulator-row.tabulator-calcs"),n=this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)"),r=this.table.element.getElementsByClassName("tabulator-group")[0],n&&(a=n.getElementsByClassName("tabulator-cell"),s=a[0],a[a.length-1]));var u=document.createElement("tbody"),d=t?this.table.rowManager.getVisibleRows(!0):this.table.rowManager.getDisplayRows(),h=[];return!1!==this.config.columnCalcs&&this.table.modExists("columnCalcs")&&(this.table.modules.columnCalcs.topInitialized&&d.unshift(this.table.modules.columnCalcs.topRow),this.table.modules.columnCalcs.botInitialized&&d.push(this.table.modules.columnCalcs.botRow)),this.table.columnManager.columnsByIndex.forEach(function(t){c.columnVisCheck(t)&&h.push(t)}),d=d.filter(function(t){switch(t.type){case"group":return!1!==c.config.rowGroups;case"calc":return!1!==c.config.columnCalcs}return!0}),d.length>1e3&&console.warn("It may take a long time to render an HTML table with more than 1000 rows"),d.forEach(function(t,n){var a=t.getData(),d=document.createElement("tr");switch(d.classList.add("tabulator-print-table-row"),t.type){case"group":var p=document.createElement("td");p.colSpan=h.length,p.innerHTML=t.key,d.classList.add("tabulator-print-table-group"),c.mapElementStyles(r,d,["border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size","background-color"]),c.mapElementStyles(r,p,["padding-top","padding-left","padding-right","padding-bottom"]),d.appendChild(p);break;case"calc":d.classList.add("tabulator-print-table-calcs");case"row":h.forEach(function(e){var o=document.createElement("td"),i=e.getFieldValue(a),n={modules:{},getValue:function(){return i},getField:function(){return e.definition.field},getElement:function(){return o},getColumn:function(){return e.getComponent()},getData:function(){return a},getRow:function(){return t.getComponent()},getComponent:function(){return n},column:e};if((e.definition.cssClass?e.definition.cssClass.split(" "):[]).forEach(function(t){o.classList.add(t)}),c.table.modExists("format"))i=c.table.modules.format.formatValue(n);else switch(void 0===i?"undefined":_typeof(i)){case"object":i=JSON.stringify(i);break;case"undefined":case"null":i="";break;default:i=i}i instanceof Node?o.appendChild(i):o.innerHTML=i,s&&c.mapElementStyles(s,o,["padding-top","padding-left","padding-right","padding-bottom","border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size","text-align"]),d.appendChild(o)}),l="calc"==t.type?i:n%2&&o?o:e,c.mapElementStyles(l,d,["border-top","border-left","border-right","border-bottom","color","font-weight","font-family","font-size","background-color"])}u.appendChild(d)}),u},S.prototype.columnVisCheck=function(t){return!1!==t.definition[this.colVisProp]&&(t.visible||!t.visible&&t.definition[this.colVisProp])},S.prototype.getHtml=function(t,e,o){var i=document.createElement("div");return i.appendChild(this.genereateTable(o||this.table.options.htmlOutputConfig,e,t,"htmlOutput")),i.innerHTML},S.prototype.mapElementStyles=function(t,e,o){if(this.cloneTableStyle&&t&&e){var i={"background-color":"backgroundColor",color:"fontColor",width:"width","font-weight":"fontWeight","font-family":"fontFamily","font-size":"fontSize","text-align":"textAlign","border-top":"borderTop","border-left":"borderLeft","border-right":"borderRight","border-bottom":"borderBottom","padding-top":"paddingTop","padding-left":"paddingLeft","padding-right":"paddingRight","padding-bottom":"paddingBottom"};if(window.getComputedStyle){var n=window.getComputedStyle(t);o.forEach(function(t){e.style[i[t]]=n.getPropertyValue(t)})}}},u.prototype.registerModule("htmlTableExport",S);var z=function(t){this.table=t,this.watchKeys=null,this.pressedKeys=null,this.keyupBinding=!1,this.keydownBinding=!1};z.prototype.initialize=function(){var t=this.table.options.keybindings,e={};if(this.watchKeys={},this.pressedKeys=[],!1!==t){for(var o in this.bindings)e[o]=this.bindings[o];if(Object.keys(t).length)for(var i in t)e[i]=t[i];this.mapBindings(e),this.bindEvents()}},z.prototype.mapBindings=function(t){var e=this,o=this;for(var i in t)!function(i){e.actions[i]?t[i]&&("object"!==_typeof(t[i])&&(t[i]=[t[i]]),t[i].forEach(function(t){o.mapBinding(i,t)})):console.warn("Key Binding Error - no such action:",i)}(i)},z.prototype.mapBinding=function(t,e){var o=this,i={action:this.actions[t],keys:[],ctrl:!1,shift:!1};e.toString().toLowerCase().split(" ").join("").split("+").forEach(function(t){switch(t){case"ctrl":i.ctrl=!0;break;case"shift":i.shift=!0;break;default:t=parseInt(t),i.keys.push(t),o.watchKeys[t]||(o.watchKeys[t]=[]),o.watchKeys[t].push(i)}})},z.prototype.bindEvents=function(){var t=this;this.keyupBinding=function(e){var o=e.keyCode,i=t.watchKeys[o];i&&(t.pressedKeys.push(o),i.forEach(function(o){t.checkBinding(e,o)}))},this.keydownBinding=function(e){var o=e.keyCode;if(t.watchKeys[o]){var i=t.pressedKeys.indexOf(o);i>-1&&t.pressedKeys.splice(i,1)}},this.table.element.addEventListener("keydown",this.keyupBinding),this.table.element.addEventListener("keyup",this.keydownBinding)},z.prototype.clearBindings=function(){this.keyupBinding&&this.table.element.removeEventListener("keydown",this.keyupBinding),this.keydownBinding&&this.table.element.removeEventListener("keyup",this.keydownBinding)},z.prototype.checkBinding=function(t,e){var o=this,i=!0;return t.ctrlKey==e.ctrl&&t.shiftKey==e.shift&&(e.keys.forEach(function(t){-1==o.pressedKeys.indexOf(t)&&(i=!1)}),i&&e.action.call(o,t),!0)},z.prototype.bindings={navPrev:"shift + 9",navNext:9,navUp:38,navDown:40,scrollPageUp:33,scrollPageDown:34,scrollToStart:36,scrollToEnd:35,undo:"ctrl + 90",redo:"ctrl + 89",copyToClipboard:"ctrl + 67"},z.prototype.actions={keyBlock:function(t){t.stopPropagation(),t.preventDefault()},scrollPageUp:function(t){var e=this.table.rowManager,o=e.scrollTop-e.height;e.element.scrollHeight;t.preventDefault(),e.displayRowsCount&&(o>=0?e.element.scrollTop=o:e.scrollToRow(e.getDisplayRows()[0])),this.table.element.focus()},scrollPageDown:function(t){var e=this.table.rowManager,o=e.scrollTop+e.height,i=e.element.scrollHeight;t.preventDefault(),e.displayRowsCount&&(o<=i?e.element.scrollTop=o:e.scrollToRow(e.getDisplayRows()[e.displayRowsCount-1])),this.table.element.focus()},scrollToStart:function(t){var e=this.table.rowManager;t.preventDefault(),e.displayRowsCount&&e.scrollToRow(e.getDisplayRows()[0]),this.table.element.focus()},scrollToEnd:function(t){var e=this.table.rowManager;t.preventDefault(),e.displayRowsCount&&e.scrollToRow(e.getDisplayRows()[e.displayRowsCount-1]),this.table.element.focus()},navPrev:function(t){var e=!1;this.table.modExists("edit")&&(e=this.table.modules.edit.currentCell)&&(t.preventDefault(),e.nav().prev())},navNext:function(t){var e,o=!1,i=this.table.options.tabEndNewRow;this.table.modExists("edit")&&(o=this.table.modules.edit.currentCell)&&(t.preventDefault(),e=o.nav(),e.next()||i&&(i=!0===i?this.table.addRow({}):"function"==typeof i?this.table.addRow(i(o.row.getComponent())):this.table.addRow(i),i.then(function(){e.next()})))},navLeft:function(t){var e=!1;this.table.modExists("edit")&&(e=this.table.modules.edit.currentCell)&&(t.preventDefault(),e.nav().left())},navRight:function(t){var e=!1;this.table.modExists("edit")&&(e=this.table.modules.edit.currentCell)&&(t.preventDefault(),e.nav().right())},navUp:function(t){var e=!1;this.table.modExists("edit")&&(e=this.table.modules.edit.currentCell)&&(t.preventDefault(),e.nav().up())},navDown:function(t){var e=!1;this.table.modExists("edit")&&(e=this.table.modules.edit.currentCell)&&(t.preventDefault(),e.nav().down())},undo:function(t){this.table.options.history&&this.table.modExists("history")&&this.table.modExists("edit")&&(this.table.modules.edit.currentCell||(t.preventDefault(),this.table.modules.history.undo()))},redo:function(t){this.table.options.history&&this.table.modExists("history")&&this.table.modExists("edit")&&(this.table.modules.edit.currentCell||(t.preventDefault(),this.table.modules.history.redo()))},copyToClipboard:function(t){this.table.modules.edit.currentCell||this.table.modExists("clipboard",!0)&&this.table.modules.clipboard.copy(this.table.options.selectable&&"highlight"!=this.table.options.selectable?"selected":"active",null,null,null,!0)}},u.prototype.registerModule("keybindings",z);var F=function(t){this.table=t,this.placeholderElement=this.createPlaceholderElement(),this.hoverElement=!1,this.checkTimeout=!1,this.checkPeriod=250,this.moving=!1,this.toCol=!1,this.toColAfter=!1,this.startX=0,this.autoScrollMargin=40,this.autoScrollStep=5,this.autoScrollTimeout=!1,this.touchMove=!1,this.moveHover=this.moveHover.bind(this),this.endMove=this.endMove.bind(this)};F.prototype.createPlaceholderElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-col"),t.classList.add("tabulator-col-placeholder"),t},F.prototype.initializeColumn=function(t){var e,o=this,i={};t.modules.frozen||(e=t.getElement(),i.mousemove=function(i){t.parent===o.moving.parent&&((o.touchMove?i.touches[0].pageX:i.pageX)-u.prototype.helpers.elOffset(e).left+o.table.columnManager.element.scrollLeft>t.getWidth()/2?o.toCol===t&&o.toColAfter||(e.parentNode.insertBefore(o.placeholderElement,e.nextSibling),o.moveColumn(t,!0)):(o.toCol!==t||o.toColAfter)&&(e.parentNode.insertBefore(o.placeholderElement,e),o.moveColumn(t,!1)))}.bind(o),e.addEventListener("mousedown",function(e){o.touchMove=!1,1===e.which&&(o.checkTimeout=setTimeout(function(){o.startMove(e,t)},o.checkPeriod))}),
e.addEventListener("mouseup",function(t){1===t.which&&o.checkTimeout&&clearTimeout(o.checkTimeout)}),o.bindTouchEvents(t)),t.modules.moveColumn=i},F.prototype.bindTouchEvents=function(t){var e,o,i,n,s,r,a,l=this,c=t.getElement(),u=!1;c.addEventListener("touchstart",function(c){l.checkTimeout=setTimeout(function(){l.touchMove=!0,e=t,o=t.nextColumn(),n=o?o.getWidth()/2:0,i=t.prevColumn(),s=i?i.getWidth()/2:0,r=0,a=0,u=!1,l.startMove(c,t)},l.checkPeriod)},{passive:!0}),c.addEventListener("touchmove",function(c){var d,h;l.moving&&(l.moveHover(c),u||(u=c.touches[0].pageX),d=c.touches[0].pageX-u,d>0?o&&d-r>n&&(h=o)!==t&&(u=c.touches[0].pageX,h.getElement().parentNode.insertBefore(l.placeholderElement,h.getElement().nextSibling),l.moveColumn(h,!0)):i&&-d-a>s&&(h=i)!==t&&(u=c.touches[0].pageX,h.getElement().parentNode.insertBefore(l.placeholderElement,h.getElement()),l.moveColumn(h,!1)),h&&(e=h,o=h.nextColumn(),r=n,n=o?o.getWidth()/2:0,i=h.prevColumn(),a=s,s=i?i.getWidth()/2:0))},{passive:!0}),c.addEventListener("touchend",function(t){l.checkTimeout&&clearTimeout(l.checkTimeout),l.moving&&l.endMove(t)})},F.prototype.startMove=function(t,e){var o=e.getElement();this.moving=e,this.startX=(this.touchMove?t.touches[0].pageX:t.pageX)-u.prototype.helpers.elOffset(o).left,this.table.element.classList.add("tabulator-block-select"),this.placeholderElement.style.width=e.getWidth()+"px",this.placeholderElement.style.height=e.getHeight()+"px",o.parentNode.insertBefore(this.placeholderElement,o),o.parentNode.removeChild(o),this.hoverElement=o.cloneNode(!0),this.hoverElement.classList.add("tabulator-moving"),this.table.columnManager.getElement().appendChild(this.hoverElement),this.hoverElement.style.left="0",this.hoverElement.style.bottom="0",this.touchMove||(this._bindMouseMove(),document.body.addEventListener("mousemove",this.moveHover),document.body.addEventListener("mouseup",this.endMove)),this.moveHover(t)},F.prototype._bindMouseMove=function(){this.table.columnManager.columnsByIndex.forEach(function(t){t.modules.moveColumn.mousemove&&t.getElement().addEventListener("mousemove",t.modules.moveColumn.mousemove)})},F.prototype._unbindMouseMove=function(){this.table.columnManager.columnsByIndex.forEach(function(t){t.modules.moveColumn.mousemove&&t.getElement().removeEventListener("mousemove",t.modules.moveColumn.mousemove)})},F.prototype.moveColumn=function(t,e){var o=this.moving.getCells();this.toCol=t,this.toColAfter=e,e?t.getCells().forEach(function(t,e){var i=t.getElement();i.parentNode.insertBefore(o[e].getElement(),i.nextSibling)}):t.getCells().forEach(function(t,e){var i=t.getElement();i.parentNode.insertBefore(o[e].getElement(),i)})},F.prototype.endMove=function(t){(1===t.which||this.touchMove)&&(this._unbindMouseMove(),this.placeholderElement.parentNode.insertBefore(this.moving.getElement(),this.placeholderElement.nextSibling),this.placeholderElement.parentNode.removeChild(this.placeholderElement),this.hoverElement.parentNode.removeChild(this.hoverElement),this.table.element.classList.remove("tabulator-block-select"),this.toCol&&this.table.columnManager.moveColumnActual(this.moving,this.toCol,this.toColAfter),this.moving=!1,this.toCol=!1,this.toColAfter=!1,this.touchMove||(document.body.removeEventListener("mousemove",this.moveHover),document.body.removeEventListener("mouseup",this.endMove)))},F.prototype.moveHover=function(t){var e,o=this,i=o.table.columnManager.getElement(),n=i.scrollLeft,s=(o.touchMove?t.touches[0].pageX:t.pageX)-u.prototype.helpers.elOffset(i).left+n;o.hoverElement.style.left=s-o.startX+"px",s-n<o.autoScrollMargin&&(o.autoScrollTimeout||(o.autoScrollTimeout=setTimeout(function(){e=Math.max(0,n-5),o.table.rowManager.getElement().scrollLeft=e,o.autoScrollTimeout=!1},1))),n+i.clientWidth-s<o.autoScrollMargin&&(o.autoScrollTimeout||(o.autoScrollTimeout=setTimeout(function(){e=Math.min(i.clientWidth,n+5),o.table.rowManager.getElement().scrollLeft=e,o.autoScrollTimeout=!1},1)))},u.prototype.registerModule("moveColumn",F);var H=function(t){this.table=t,this.placeholderElement=this.createPlaceholderElement(),this.hoverElement=!1,this.checkTimeout=!1,this.checkPeriod=150,this.moving=!1,this.toRow=!1,this.toRowAfter=!1,this.hasHandle=!1,this.startY=0,this.startX=0,this.moveHover=this.moveHover.bind(this),this.endMove=this.endMove.bind(this),this.tableRowDropEvent=!1,this.touchMove=!1,this.connection=!1,this.connections=[],this.connectedTable=!1,this.connectedRow=!1};H.prototype.createPlaceholderElement=function(){var t=document.createElement("div");return t.classList.add("tabulator-row"),t.classList.add("tabulator-row-placeholder"),t},H.prototype.initialize=function(t){this.connection=this.table.options.movableRowsConnectedTables},H.prototype.setHandle=function(t){this.hasHandle=t},H.prototype.initializeGroupHeader=function(t){var e=this,o={};o.mouseup=function(t){e.tableRowDrop(t,row)}.bind(e),o.mousemove=function(o){if(o.pageY-u.prototype.helpers.elOffset(t.element).top+e.table.rowManager.element.scrollTop>t.getHeight()/2){if(e.toRow!==t||!e.toRowAfter){var i=t.getElement();i.parentNode.insertBefore(e.placeholderElement,i.nextSibling),e.moveRow(t,!0)}}else if(e.toRow!==t||e.toRowAfter){var i=t.getElement();i.previousSibling&&(i.parentNode.insertBefore(e.placeholderElement,i),e.moveRow(t,!1))}}.bind(e),t.modules.moveRow=o},H.prototype.initializeRow=function(t){var e,o=this,i={};i.mouseup=function(e){o.tableRowDrop(e,t)}.bind(o),i.mousemove=function(e){if(e.pageY-u.prototype.helpers.elOffset(t.element).top+o.table.rowManager.element.scrollTop>t.getHeight()/2){if(o.toRow!==t||!o.toRowAfter){var i=t.getElement();i.parentNode.insertBefore(o.placeholderElement,i.nextSibling),o.moveRow(t,!0)}}else if(o.toRow!==t||o.toRowAfter){var i=t.getElement();i.parentNode.insertBefore(o.placeholderElement,i),o.moveRow(t,!1)}}.bind(o),this.hasHandle||(e=t.getElement(),e.addEventListener("mousedown",function(e){1===e.which&&(o.checkTimeout=setTimeout(function(){o.startMove(e,t)},o.checkPeriod))}),e.addEventListener("mouseup",function(t){1===t.which&&o.checkTimeout&&clearTimeout(o.checkTimeout)}),this.bindTouchEvents(t,t.getElement())),t.modules.moveRow=i},H.prototype.initializeCell=function(t){var e=this,o=t.getElement();o.addEventListener("mousedown",function(o){1===o.which&&(e.checkTimeout=setTimeout(function(){e.startMove(o,t.row)},e.checkPeriod))}),o.addEventListener("mouseup",function(t){1===t.which&&e.checkTimeout&&clearTimeout(e.checkTimeout)}),this.bindTouchEvents(t.row,t.getElement())},H.prototype.bindTouchEvents=function(t,e){var o,i,n,s,r,a,l,c=this,u=!1;e.addEventListener("touchstart",function(e){c.checkTimeout=setTimeout(function(){c.touchMove=!0,o=t,i=t.nextRow(),s=i?i.getHeight()/2:0,n=t.prevRow(),r=n?n.getHeight()/2:0,a=0,l=0,u=!1,c.startMove(e,t)},c.checkPeriod)},{passive:!0}),this.moving,this.toRow,this.toRowAfter,e.addEventListener("touchmove",function(e){var d,h;c.moving&&(e.preventDefault(),c.moveHover(e),u||(u=e.touches[0].pageY),d=e.touches[0].pageY-u,d>0?i&&d-a>s&&(h=i)!==t&&(u=e.touches[0].pageY,h.getElement().parentNode.insertBefore(c.placeholderElement,h.getElement().nextSibling),c.moveRow(h,!0)):n&&-d-l>r&&(h=n)!==t&&(u=e.touches[0].pageY,h.getElement().parentNode.insertBefore(c.placeholderElement,h.getElement()),c.moveRow(h,!1)),h&&(o=h,i=h.nextRow(),a=s,s=i?i.getHeight()/2:0,n=h.prevRow(),l=r,r=n?n.getHeight()/2:0))}),e.addEventListener("touchend",function(t){c.checkTimeout&&clearTimeout(c.checkTimeout),c.moving&&(c.endMove(t),c.touchMove=!1)})},H.prototype._bindMouseMove=function(){this.table.rowManager.getDisplayRows().forEach(function(t){"row"!==t.type&&"group"!==t.type||!t.modules.moveRow.mousemove||t.getElement().addEventListener("mousemove",t.modules.moveRow.mousemove)})},H.prototype._unbindMouseMove=function(){this.table.rowManager.getDisplayRows().forEach(function(t){"row"!==t.type&&"group"!==t.type||!t.modules.moveRow.mousemove||t.getElement().removeEventListener("mousemove",t.modules.moveRow.mousemove)})},H.prototype.startMove=function(t,e){var o=e.getElement();this.setStartPosition(t,e),this.moving=e,this.table.element.classList.add("tabulator-block-select"),this.placeholderElement.style.width=e.getWidth()+"px",this.placeholderElement.style.height=e.getHeight()+"px",this.connection?(this.table.element.classList.add("tabulator-movingrow-sending"),this.connectToTables(e)):(o.parentNode.insertBefore(this.placeholderElement,o),o.parentNode.removeChild(o)),this.hoverElement=o.cloneNode(!0),this.hoverElement.classList.add("tabulator-moving"),this.connection?(document.body.appendChild(this.hoverElement),this.hoverElement.style.left="0",this.hoverElement.style.top="0",this.hoverElement.style.width=this.table.element.clientWidth+"px",this.hoverElement.style.whiteSpace="nowrap",this.hoverElement.style.overflow="hidden",this.hoverElement.style.pointerEvents="none"):(this.table.rowManager.getTableElement().appendChild(this.hoverElement),this.hoverElement.style.left="0",this.hoverElement.style.top="0",this._bindMouseMove()),document.body.addEventListener("mousemove",this.moveHover),document.body.addEventListener("mouseup",this.endMove),this.moveHover(t)},H.prototype.setStartPosition=function(t,e){var o,i,n=this.touchMove?t.touches[0].pageX:t.pageX,s=this.touchMove?t.touches[0].pageY:t.pageY;o=e.getElement(),this.connection?(i=o.getBoundingClientRect(),this.startX=i.left-n+window.pageXOffset,this.startY=i.top-s+window.pageYOffset):this.startY=s-o.getBoundingClientRect().top},H.prototype.endMove=function(t){t&&1!==t.which&&!this.touchMove||(this._unbindMouseMove(),this.connection||(this.placeholderElement.parentNode.insertBefore(this.moving.getElement(),this.placeholderElement.nextSibling),this.placeholderElement.parentNode.removeChild(this.placeholderElement)),this.hoverElement.parentNode.removeChild(this.hoverElement),this.table.element.classList.remove("tabulator-block-select"),this.toRow&&this.table.rowManager.moveRow(this.moving,this.toRow,this.toRowAfter),this.moving=!1,this.toRow=!1,this.toRowAfter=!1,document.body.removeEventListener("mousemove",this.moveHover),document.body.removeEventListener("mouseup",this.endMove),this.connection&&(this.table.element.classList.remove("tabulator-movingrow-sending"),this.disconnectFromTables()))},H.prototype.moveRow=function(t,e){this.toRow=t,this.toRowAfter=e},H.prototype.moveHover=function(t){this.connection?this.moveHoverConnections.call(this,t):this.moveHoverTable.call(this,t)},H.prototype.moveHoverTable=function(t){var e=this.table.rowManager.getElement(),o=e.scrollTop,i=(this.touchMove?t.touches[0].pageY:t.pageY)-e.getBoundingClientRect().top+o;this.hoverElement.style.top=i-this.startY+"px"},H.prototype.moveHoverConnections=function(t){this.hoverElement.style.left=this.startX+(this.touchMove?t.touches[0].pageX:t.pageX)+"px",this.hoverElement.style.top=this.startY+(this.touchMove?t.touches[0].pageY:t.pageY)+"px"},H.prototype.connectToTables=function(t){var e=this.table.modules.comms.getConnections(this.connection);this.table.options.movableRowsSendingStart.call(this.table,e),this.table.modules.comms.send(this.connection,"moveRow","connect",{row:t})},H.prototype.disconnectFromTables=function(){var t=this.table.modules.comms.getConnections(this.connection);this.table.options.movableRowsSendingStop.call(this.table,t),this.table.modules.comms.send(this.connection,"moveRow","disconnect")},H.prototype.connect=function(t,e){var o=this;return this.connectedTable?(console.warn("Move Row Error - Table cannot accept connection, already connected to table:",this.connectedTable),!1):(this.connectedTable=t,this.connectedRow=e,this.table.element.classList.add("tabulator-movingrow-receiving"),o.table.rowManager.getDisplayRows().forEach(function(t){"row"===t.type&&t.modules.moveRow&&t.modules.moveRow.mouseup&&t.getElement().addEventListener("mouseup",t.modules.moveRow.mouseup)}),o.tableRowDropEvent=o.tableRowDrop.bind(o),o.table.element.addEventListener("mouseup",o.tableRowDropEvent),this.table.options.movableRowsReceivingStart.call(this.table,e,t),!0)},H.prototype.disconnect=function(t){var e=this;t===this.connectedTable?(this.connectedTable=!1,this.connectedRow=!1,this.table.element.classList.remove("tabulator-movingrow-receiving"),e.table.rowManager.getDisplayRows().forEach(function(t){"row"===t.type&&t.modules.moveRow&&t.modules.moveRow.mouseup&&t.getElement().removeEventListener("mouseup",t.modules.moveRow.mouseup)}),e.table.element.removeEventListener("mouseup",e.tableRowDropEvent),this.table.options.movableRowsReceivingStop.call(this.table,t)):console.warn("Move Row Error - trying to disconnect from non connected table")},H.prototype.dropComplete=function(t,e,o){var i=!1;if(o){switch(_typeof(this.table.options.movableRowsSender)){case"string":i=this.senders[this.table.options.movableRowsSender];break;case"function":i=this.table.options.movableRowsSender}i?i.call(this,this.moving.getComponent(),e?e.getComponent():void 0,t):this.table.options.movableRowsSender&&console.warn("Mover Row Error - no matching sender found:",this.table.options.movableRowsSender),this.table.options.movableRowsSent.call(this.table,this.moving.getComponent(),e?e.getComponent():void 0,t)}else this.table.options.movableRowsSentFailed.call(this.table,this.moving.getComponent(),e?e.getComponent():void 0,t);this.endMove()},H.prototype.tableRowDrop=function(t,e){var o=!1,i=!1;switch(t.stopImmediatePropagation(),_typeof(this.table.options.movableRowsReceiver)){case"string":o=this.receivers[this.table.options.movableRowsReceiver];break;case"function":o=this.table.options.movableRowsReceiver}o?i=o.call(this,this.connectedRow.getComponent(),e?e.getComponent():void 0,this.connectedTable):console.warn("Mover Row Error - no matching receiver found:",this.table.options.movableRowsReceiver),i?this.table.options.movableRowsReceived.call(this.table,this.connectedRow.getComponent(),e?e.getComponent():void 0,this.connectedTable):this.table.options.movableRowsReceivedFailed.call(this.table,this.connectedRow.getComponent(),e?e.getComponent():void 0,this.connectedTable),this.table.modules.comms.send(this.connectedTable,"moveRow","dropcomplete",{row:e,success:i})},H.prototype.receivers={insert:function(t,e,o){return this.table.addRow(t.getData(),void 0,e),!0},add:function(t,e,o){return this.table.addRow(t.getData()),!0},update:function(t,e,o){return!!e&&(e.update(t.getData()),!0)},replace:function(t,e,o){return!!e&&(this.table.addRow(t.getData(),void 0,e),e.delete(),!0)}},H.prototype.senders={delete:function(t,e,o){t.delete()}},H.prototype.commsReceived=function(t,e,o){switch(e){case"connect":return this.connect(t,o.row);case"disconnect":return this.disconnect(t);case"dropcomplete":return this.dropComplete(t,o.row,o.success)}},u.prototype.registerModule("moveRow",H);var _=function(t){this.table=t,this.allowedTypes=["","data","edit","clipboard"],this.enabled=!0};_.prototype.initializeColumn=function(t){var e=this,o=!1,i={};this.allowedTypes.forEach(function(n){var s,r="mutator"+(n.charAt(0).toUpperCase()+n.slice(1));t.definition[r]&&(s=e.lookupMutator(t.definition[r]))&&(o=!0,i[r]={mutator:s,params:t.definition[r+"Params"]||{}})}),o&&(t.modules.mutate=i)},_.prototype.lookupMutator=function(t){var e=!1;switch(void 0===t?"undefined":_typeof(t)){case"string":this.mutators[t]?e=this.mutators[t]:console.warn("Mutator Error - No such mutator found, ignoring: ",t);break;case"function":e=t}return e},_.prototype.transformRow=function(t,e,o){var i,n=this,s="mutator"+(e.charAt(0).toUpperCase()+e.slice(1));return this.enabled&&n.table.columnManager.traverse(function(n){var r,a,l;n.modules.mutate&&(r=n.modules.mutate[s]||n.modules.mutate.mutator||!1)&&o&&(i=n.getFieldValue(o),"data"!=e&&void 0===i||(l=n.getComponent(),a="function"==typeof r.params?r.params(i,t,e,l):r.params,n.setFieldValue(t,r.mutator(i,t,e,a,l))))}),t},_.prototype.transformCell=function(t,e){var o=t.column.modules.mutate.mutatorEdit||t.column.modules.mutate.mutator||!1,i={};return o?(i=Object.assign(i,t.row.getData()),t.column.setFieldValue(i,e),o.mutator(e,i,"edit",o.params,t.getComponent())):e},_.prototype.enable=function(){this.enabled=!0},_.prototype.disable=function(){this.enabled=!1},_.prototype.mutators={},u.prototype.registerModule("mutator",_);var A=function(t){this.table=t,this.mode="local",this.progressiveLoad=!1,this.size=0,this.page=1,this.count=5,this.max=1,this.displayIndex=0,this.pageSizes=[],this.createElements()};A.prototype.createElements=function(){var t;this.element=document.createElement("span"),this.element.classList.add("tabulator-paginator"),this.pagesElement=document.createElement("span"),this.pagesElement.classList.add("tabulator-pages"),t=document.createElement("button"),t.classList.add("tabulator-page"),t.setAttribute("type","button"),t.setAttribute("role","button"),t.setAttribute("aria-label",""),t.setAttribute("title",""),this.firstBut=t.cloneNode(!0),this.firstBut.setAttribute("data-page","first"),this.prevBut=t.cloneNode(!0),this.prevBut.setAttribute("data-page","prev"),this.nextBut=t.cloneNode(!0),this.nextBut.setAttribute("data-page","next"),this.lastBut=t.cloneNode(!0),this.lastBut.setAttribute("data-page","last"),this.table.options.paginationSizeSelector&&(this.pageSizeSelect=document.createElement("select"),this.pageSizeSelect.classList.add("tabulator-page-size"))},A.prototype.generatePageSizeSelectList=function(){var t=this,e=[];if(this.pageSizeSelect){if(Array.isArray(this.table.options.paginationSizeSelector))e=this.table.options.paginationSizeSelector,this.pageSizes=e,-1==this.pageSizes.indexOf(this.size)&&e.unshift(this.size);else if(-1==this.pageSizes.indexOf(this.size)){e=[];for(var o=1;o<5;o++)e.push(this.size*o);this.pageSizes=e}else e=this.pageSizes;for(;this.pageSizeSelect.firstChild;)this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);e.forEach(function(e){var o=document.createElement("option");o.value=e,o.innerHTML=e,t.pageSizeSelect.appendChild(o)}),this.pageSizeSelect.value=this.size}},A.prototype.initialize=function(t){var e,o=this;for(var i in o.table.options.paginationDataSent)o.paginationDataSentNames[i]=o.table.options.paginationDataSent[i];for(var n in o.table.options.paginationDataReceived)o.paginationDataReceivedNames[n]=o.table.options.paginationDataReceived[n];o.table.modules.localize.bind("pagination|first",function(t){o.firstBut.innerHTML=t}),o.table.modules.localize.bind("pagination|first_title",function(t){o.firstBut.setAttribute("aria-label",t),o.firstBut.setAttribute("title",t)}),o.table.modules.localize.bind("pagination|prev",function(t){o.prevBut.innerHTML=t}),o.table.modules.localize.bind("pagination|prev_title",function(t){o.prevBut.setAttribute("aria-label",t),o.prevBut.setAttribute("title",t)}),o.table.modules.localize.bind("pagination|next",function(t){o.nextBut.innerHTML=t}),o.table.modules.localize.bind("pagination|next_title",function(t){o.nextBut.setAttribute("aria-label",t),o.nextBut.setAttribute("title",t)}),o.table.modules.localize.bind("pagination|last",function(t){o.lastBut.innerHTML=t}),o.table.modules.localize.bind("pagination|last_title",function(t){o.lastBut.setAttribute("aria-label",t),o.lastBut.setAttribute("title",t)}),o.firstBut.addEventListener("click",function(){o.setPage(1)}),o.prevBut.addEventListener("click",function(){o.previousPage()}),o.nextBut.addEventListener("click",function(){o.nextPage().then(function(){}).catch(function(){})}),o.lastBut.addEventListener("click",function(){o.setPage(o.max)}),o.table.options.paginationElement&&(o.element=o.table.options.paginationElement),this.pageSizeSelect&&(e=document.createElement("label"),o.table.modules.localize.bind("pagination|page_size",function(t){o.pageSizeSelect.setAttribute("aria-label",t),o.pageSizeSelect.setAttribute("title",t),e.innerHTML=t}),o.element.appendChild(e),o.element.appendChild(o.pageSizeSelect),o.pageSizeSelect.addEventListener("change",function(t){o.setPageSize(o.pageSizeSelect.value),o.setPage(1).then(function(){}).catch(function(){})})),o.element.appendChild(o.firstBut),o.element.appendChild(o.prevBut),o.element.appendChild(o.pagesElement),o.element.appendChild(o.nextBut),o.element.appendChild(o.lastBut),o.table.options.paginationElement||t||o.table.footerManager.append(o.element,o),o.mode=o.table.options.pagination,o.size=o.table.options.paginationSize||Math.floor(o.table.rowManager.getElement().clientHeight/24),o.count=o.table.options.paginationButtonCount,o.generatePageSizeSelectList()},A.prototype.initializeProgressive=function(t){this.initialize(!0),this.mode="progressive_"+t,this.progressiveLoad=!0},A.prototype.setDisplayIndex=function(t){this.displayIndex=t},A.prototype.getDisplayIndex=function(){return this.displayIndex},A.prototype.setMaxRows=function(t){this.max=t?Math.ceil(t/this.size):1,this.page>this.max&&(this.page=this.max)},A.prototype.reset=function(t){return("local"==this.mode||t)&&(this.page=1),!0},A.prototype.setMaxPage=function(t){t=parseInt(t),this.max=t||1,this.page>this.max&&(this.page=this.max,this.trigger())},A.prototype.setPage=function(t){var e=this,o=this;return new Promise(function(i,n){t=parseInt(t),t>0&&t<=e.max?(e.page=t,e.trigger().then(function(){i()}).catch(function(){n()}),o.table.options.persistence&&o.table.modExists("persistence",!0)&&o.table.modules.persistence.config.page&&o.table.modules.persistence.save("page")):(console.warn("Pagination Error - Requested page is out of range of 1 - "+e.max+":",t),n())})},A.prototype.setPageToRow=function(t){var e=this;return new Promise(function(o,i){var n=e.table.rowManager.getDisplayRows(e.displayIndex-1),s=n.indexOf(t);if(s>-1){var r=Math.ceil((s+1)/e.size);e.setPage(r).then(function(){o()}).catch(function(){i()})}else console.warn("Pagination Error - Requested row is not visible"),i()})},A.prototype.setPageSize=function(t){t=parseInt(t),t>0&&(this.size=t),this.pageSizeSelect&&this.generatePageSizeSelectList(),this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.page&&this.table.modules.persistence.save("page")},A.prototype._setPageButtons=function(){for(var t=this,e=Math.floor((this.count-1)/2),o=Math.ceil((this.count-1)/2),i=this.max-this.page+e+1<this.count?this.max-this.count+1:Math.max(this.page-e,1),n=this.page<=o?Math.min(this.count,this.max):Math.min(this.page+o,this.max);t.pagesElement.firstChild;)t.pagesElement.removeChild(t.pagesElement.firstChild);1==t.page?(t.firstBut.disabled=!0,t.prevBut.disabled=!0):(t.firstBut.disabled=!1,t.prevBut.disabled=!1),t.page==t.max?(t.lastBut.disabled=!0,t.nextBut.disabled=!0):(t.lastBut.disabled=!1,t.nextBut.disabled=!1);for(var s=i;s<=n;s++)s>0&&s<=t.max&&t.pagesElement.appendChild(t._generatePageButton(s));this.footerRedraw()},A.prototype._generatePageButton=function(t){var e=this,o=document.createElement("button");return o.classList.add("tabulator-page"),t==e.page&&o.classList.add("active"),o.setAttribute("type","button"),o.setAttribute("role","button"),o.setAttribute("aria-label","Show Page "+t),o.setAttribute("title","Show Page "+t),o.setAttribute("data-page",t),o.textContent=t,o.addEventListener("click",function(o){e.setPage(t)}),o},A.prototype.previousPage=function(){var t=this;return new Promise(function(e,o){t.page>1?(t.page--,t.trigger().then(function(){e()}).catch(function(){o()})):(console.warn("Pagination Error - Previous page would be less than page 1:",0),o())})},A.prototype.nextPage=function(){var t=this;return new Promise(function(e,o){t.page<t.max?(t.page++,t.trigger().then(function(){e()}).catch(function(){o()})):(t.progressiveLoad||console.warn("Pagination Error - Next page would be greater than maximum page of "+t.max+":",t.max+1),o())})},A.prototype.getPage=function(){return this.page},A.prototype.getPageMax=function(){return this.max},A.prototype.getPageSize=function(t){return this.size},A.prototype.getMode=function(){return this.mode},A.prototype.getRows=function(t){var e,o,i;if("local"==this.mode){e=[],o=this.size*(this.page-1),i=o+parseInt(this.size),this._setPageButtons();for(var n=o;n<i;n++)t[n]&&e.push(t[n]);return e}return this._setPageButtons(),t.slice(0)},A.prototype.trigger=function(){var t,e=this;return new Promise(function(o,i){switch(e.mode){case"local":t=e.table.rowManager.scrollLeft,e.table.rowManager.refreshActiveData("page"),e.table.rowManager.scrollHorizontal(t),e.table.options.pageLoaded.call(e.table,e.getPage()),o();break;case"remote":case"progressive_load":case"progressive_scroll":e.table.modules.ajax.blockActiveRequest(),e._getRemotePage().then(function(){o()}).catch(function(){i()});break;default:console.warn("Pagination Error - no such pagination mode:",e.mode),i()}})},A.prototype._getRemotePage=function(){var t,e,o=this,i=this;return new Promise(function(n,s){if(i.table.modExists("ajax",!0)||s(),t=u.prototype.helpers.deepClone(i.table.modules.ajax.getParams()||{}),e=i.table.modules.ajax.getParams(),e[o.paginationDataSentNames.page]=i.page,o.size&&(e[o.paginationDataSentNames.size]=o.size),o.table.options.ajaxSorting&&o.table.modExists("sort")){var r=i.table.modules.sort.getSort();r.forEach(function(t){delete t.column}),e[o.paginationDataSentNames.sorters]=r}if(o.table.options.ajaxFiltering&&o.table.modExists("filter")){var a=i.table.modules.filter.getFilters(!0,!0);e[o.paginationDataSentNames.filters]=a}i.table.modules.ajax.setParams(e),i.table.modules.ajax.sendRequest(o.progressiveLoad).then(function(t){i._parseRemoteData(t),n()}).catch(function(t){s()}),i.table.modules.ajax.setParams(t)})},A.prototype._parseRemoteData=function(t){var e,t,o,i=this;if(void 0===t[this.paginationDataReceivedNames.last_page]&&console.warn("Remote Pagination Error - Server response missing '"+this.paginationDataReceivedNames.last_page+"' property"),t[this.paginationDataReceivedNames.data])if(this.max=parseInt(t[this.paginationDataReceivedNames.last_page])||1,this.progressiveLoad)switch(this.mode){case"progressive_load":this.table.rowManager.addRows(t[this.paginationDataReceivedNames.data]),this.page<this.max&&setTimeout(function(){i.nextPage().then(function(){}).catch(function(){})},i.table.options.ajaxProgressiveLoadDelay);break;case"progressive_scroll":t=this.table.rowManager.getData().concat(t[this.paginationDataReceivedNames.data]),this.table.rowManager.setData(t,!0),o=this.table.options.ajaxProgressiveLoadScrollMargin||2*this.table.rowManager.element.clientHeight,i.table.rowManager.element.scrollHeight<=i.table.rowManager.element.clientHeight+o&&i.nextPage().then(function(){}).catch(function(){})}else e=this.table.rowManager.scrollLeft,this.table.rowManager.setData(t[this.paginationDataReceivedNames.data]),this.table.rowManager.scrollHorizontal(e),this.table.columnManager.scrollHorizontal(e),this.table.options.pageLoaded.call(this.table,this.getPage());else console.warn("Remote Pagination Error - Server response missing '"+this.paginationDataReceivedNames.data+"' property")},A.prototype.footerRedraw=function(){var t=this.table.footerManager.element;Math.ceil(t.clientWidth)-t.scrollWidth<0?this.pagesElement.style.display="none":(this.pagesElement.style.display="",Math.ceil(t.clientWidth)-t.scrollWidth<0&&(this.pagesElement.style.display="none"))},A.prototype.paginationDataSentNames={page:"page",size:"size",sorters:"sorters",filters:"filters"},A.prototype.paginationDataReceivedNames={current_page:"current_page",last_page:"last_page",data:"data"},u.prototype.registerModule("page",A);var P=function(t){this.table=t,this.mode="",this.id="",this.defWatcherBlock=!1,this.config={},this.readFunc=!1,this.writeFunc=!1};P.prototype.localStorageTest=function(){var t="_tabulator_test";try{return window.localStorage.setItem(t,t),window.localStorage.removeItem(t),!0}catch(t){return!1}},P.prototype.initialize=function(){var t,e=this.table.options.persistenceMode,o=this.table.options.persistenceID;this.mode=!0!==e?e:this.localStorageTest()?"local":"cookie",this.table.options.persistenceReaderFunc?"function"==typeof this.table.options.persistenceReaderFunc?this.readFunc=this.table.options.persistenceReaderFunc:this.readers[this.table.options.persistenceReaderFunc]?this.readFunc=this.readers[this.table.options.persistenceReaderFunc]:console.warn("Persistence Read Error - invalid reader set",this.table.options.persistenceReaderFunc):this.readers[this.mode]?this.readFunc=this.readers[this.mode]:console.warn("Persistence Read Error - invalid reader set",this.mode),this.table.options.persistenceWriterFunc?"function"==typeof this.table.options.persistenceWriterFunc?this.writeFunc=this.table.options.persistenceWriterFunc:this.readers[this.table.options.persistenceWriterFunc]?this.writeFunc=this.readers[this.table.options.persistenceWriterFunc]:console.warn("Persistence Write Error - invalid reader set",this.table.options.persistenceWriterFunc):this.writers[this.mode]?this.writeFunc=this.writers[this.mode]:console.warn("Persistence Write Error - invalid writer set",this.mode),this.id="tabulator-"+(o||this.table.element.getAttribute("id")||""),this.config={sort:!0===this.table.options.persistence||this.table.options.persistence.sort,filter:!0===this.table.options.persistence||this.table.options.persistence.filter,group:!0===this.table.options.persistence||this.table.options.persistence.group,page:!0===this.table.options.persistence||this.table.options.persistence.page,columns:!0===this.table.options.persistence?["title","width","visible"]:this.table.options.persistence.columns},this.config.page&&(t=this.retreiveData("page"))&&(void 0===t.paginationSize||!0!==this.config.page&&!this.config.page.size||(this.table.options.paginationSize=t.paginationSize),void 0===t.paginationInitialPage||!0!==this.config.page&&!this.config.page.page||(this.table.options.paginationInitialPage=t.paginationInitialPage)),this.config.group&&(t=this.retreiveData("group"))&&(void 0===t.groupBy||!0!==this.config.group&&!this.config.group.groupBy||(this.table.options.groupBy=t.groupBy),void 0===t.groupStartOpen||!0!==this.config.group&&!this.config.group.groupStartOpen||(this.table.options.groupStartOpen=t.groupStartOpen),void 0===t.groupHeader||!0!==this.config.group&&!this.config.group.groupHeader||(this.table.options.groupHeader=t.groupHeader))},P.prototype.initializeColumn=function(t){var e,o,i=this;this.config.columns&&(this.defWatcherBlock=!0,e=t.getDefinition(),o=!0===this.config.columns?Object.keys(e):this.config.columns,o.forEach(function(t){var o=Object.getOwnPropertyDescriptor(e,t),n=e[t];o&&Object.defineProperty(e,t,{set:function(t){n=t,i.defWatcherBlock||i.save("columns"),o.set&&o.set(t)},get:function(){return o.get&&o.get(),n}})}),this.defWatcherBlock=!1)},P.prototype.load=function(t,e){var o=this.retreiveData(t);return e&&(o=o?this.mergeDefinition(e,o):e),o},P.prototype.retreiveData=function(t){return!!this.readFunc&&this.readFunc(this.id,t)},P.prototype.mergeDefinition=function(t,e){var o=this,i=[];return e=e||[],e.forEach(function(e,n){var s,r=o._findColumn(t,e);r&&(!0===o.config.columns||void 0==o.config.columns?(s=Object.keys(r),s.push("width")):s=o.config.columns,s.forEach(function(t){void 0!==e[t]&&(r[t]=e[t])}),r.columns&&(r.columns=o.mergeDefinition(r.columns,e.columns)),i.push(r))}),t.forEach(function(t,n){o._findColumn(e,t)||(i.length>n?i.splice(n,0,t):i.push(t))}),i},P.prototype._findColumn=function(t,e){var o=e.columns?"group":e.field?"field":"object";return t.find(function(t){switch(o){case"group":return t.title===e.title&&t.columns.length===e.columns.length;case"field":return t.field===e.field;case"object":return t===e}})},P.prototype.save=function(t){var e={};switch(t){case"columns":e=this.parseColumns(this.table.columnManager.getColumns());break;case"filter":e=this.table.modules.filter.getFilters();break;case"sort":e=this.validateSorters(this.table.modules.sort.getSort());break;case"group":e=this.getGroupConfig();break;case"page":e=this.getPageConfig()}this.writeFunc&&this.writeFunc(this.id,t,e)},P.prototype.validateSorters=function(t){return t.forEach(function(t){t.column=t.field,delete t.field}),t},P.prototype.getGroupConfig=function(){
return this.config.group&&((!0===this.config.group||this.config.group.groupBy)&&(data.groupBy=this.table.options.groupBy),(!0===this.config.group||this.config.group.groupStartOpen)&&(data.groupStartOpen=this.table.options.groupStartOpen),(!0===this.config.group||this.config.group.groupHeader)&&(data.groupHeader=this.table.options.groupHeader)),data},P.prototype.getPageConfig=function(){var t={};return this.config.page&&((!0===this.config.page||this.config.page.size)&&(t.paginationSize=this.table.modules.page.getPageSize()),(!0===this.config.page||this.config.page.page)&&(t.paginationInitialPage=this.table.modules.page.getPage())),t},P.prototype.parseColumns=function(t){var e=this,o=[];return t.forEach(function(t){var i,n={},s=t.getDefinition();t.isGroup?(n.title=s.title,n.columns=e.parseColumns(t.getColumns())):(n.field=t.getField(),!0===e.config.columns||void 0==e.config.columns?(i=Object.keys(s),i.push("width")):i=e.config.columns,i.forEach(function(e){switch(e){case"width":n.width=t.getWidth();break;case"visible":n.visible=t.visible;break;default:n[e]=s[e]}})),o.push(n)}),o},P.prototype.readers={local:function(t,e){var o=localStorage.getItem(t+"-"+e);return!!o&&JSON.parse(o)},cookie:function(t,e){var o,i=document.cookie,n=t+"-"+e,s=i.indexOf(n+"=");return s>-1&&(i=i.substr(s),o=i.indexOf(";"),o>-1&&(i=i.substr(0,o)),data=i.replace(n+"=","")),!!data&&JSON.parse(data)}},P.prototype.writers={local:function(t,e,o){localStorage.setItem(t+"-"+e,JSON.stringify(o))},cookie:function(t,e,o){var i=new Date;i.setDate(i.getDate()+1e4),document.cookie=t+"_"+e+"="+JSON.stringify(o)+"; expires="+i.toUTCString()}},u.prototype.registerModule("persistence",P);var B=function(t){this.table=t,this.element=!1,this.manualBlock=!1};B.prototype.initialize=function(){window.addEventListener("beforeprint",this.replaceTable.bind(this)),window.addEventListener("afterprint",this.cleanup.bind(this))},B.prototype.replaceTable=function(){this.manualBlock||(this.element=document.createElement("div"),this.element.classList.add("tabulator-print-table"),this.element.appendChild(this.table.modules.htmlTableExport.genereateTable(this.table.options.printConfig,this.table.options.printCopyStyle,this.table.options.printVisibleRows,"print")),this.table.element.style.display="none",this.table.element.parentNode.insertBefore(this.element,this.table.element))},B.prototype.cleanup=function(){document.body.classList.remove("tabulator-print-fullscreen-hide"),this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.table.element.style.display="")},B.prototype.printFullscreen=function(t,e,o){var i,n,s=window.scrollX,r=window.scrollY,a=document.createElement("div"),l=document.createElement("div"),c=this.table.modules.htmlTableExport.genereateTable(void 0!==o?o:this.table.options.printConfig,void 0!==e?e:this.table.options.printCopyStyle,t,"print");this.manualBlock=!0,this.element=document.createElement("div"),this.element.classList.add("tabulator-print-fullscreen"),this.table.options.printHeader&&(a.classList.add("tabulator-print-header"),i="function"==typeof this.table.options.printHeader?this.table.options.printHeader.call(this.table):this.table.options.printHeader,"string"==typeof i?a.innerHTML=i:a.appendChild(i),this.element.appendChild(a)),this.element.appendChild(c),this.table.options.printFooter&&(l.classList.add("tabulator-print-footer"),n="function"==typeof this.table.options.printFooter?this.table.options.printFooter.call(this.table):this.table.options.printFooter,"string"==typeof n?l.innerHTML=n:l.appendChild(n),this.element.appendChild(l)),document.body.classList.add("tabulator-print-fullscreen-hide"),document.body.appendChild(this.element),this.table.options.printFormatter&&this.table.options.printFormatter(this.element,c),window.print(),this.cleanup(),window.scrollTo(s,r),this.manualBlock=!1},u.prototype.registerModule("print",B);var N=function(t){this.table=t,this.data=!1,this.blocked=!1,this.origFuncs={},this.currentVersion=0};N.prototype.watchData=function(t){var e,o=this;this.currentVersion++,e=this.currentVersion,o.unwatchData(),o.data=t,o.origFuncs.push=t.push,Object.defineProperty(o.data,"push",{enumerable:!1,configurable:!0,value:function(){var i=Array.from(arguments);return o.blocked||e!==o.currentVersion||i.forEach(function(t){o.table.rowManager.addRowActual(t,!1)}),o.origFuncs.push.apply(t,arguments)}}),o.origFuncs.unshift=t.unshift,Object.defineProperty(o.data,"unshift",{enumerable:!1,configurable:!0,value:function(){var i=Array.from(arguments);return o.blocked||e!==o.currentVersion||i.forEach(function(t){o.table.rowManager.addRowActual(t,!0)}),o.origFuncs.unshift.apply(t,arguments)}}),o.origFuncs.shift=t.shift,Object.defineProperty(o.data,"shift",{enumerable:!1,configurable:!0,value:function(){var i;return o.blocked||e!==o.currentVersion||o.data.length&&(i=o.table.rowManager.getRowFromDataObject(o.data[0]))&&i.deleteActual(),o.origFuncs.shift.call(t)}}),o.origFuncs.pop=t.pop,Object.defineProperty(o.data,"pop",{enumerable:!1,configurable:!0,value:function(){var i;return o.blocked||e!==o.currentVersion||o.data.length&&(i=o.table.rowManager.getRowFromDataObject(o.data[o.data.length-1]))&&i.deleteActual(),o.origFuncs.pop.call(t)}}),o.origFuncs.splice=t.splice,Object.defineProperty(o.data,"splice",{enumerable:!1,configurable:!0,value:function(){var i,n=Array.from(arguments),s=n[0]<0?t.length+n[0]:n[0],r=n[1],a=!!n[2]&&n.slice(2);if(!o.blocked&&e===o.currentVersion){if(a&&(i=!!t[s]&&o.table.rowManager.getRowFromDataObject(t[s]),i?a.forEach(function(t){o.table.rowManager.addRowActual(t,!0,i,!0)}):(a=a.slice().reverse(),a.forEach(function(t){o.table.rowManager.addRowActual(t,!0,!1,!0)}))),0!==r){var l=t.slice(s,void 0===n[1]?n[1]:s+r);l.forEach(function(t,e){var i=o.table.rowManager.getRowFromDataObject(t);i&&i.deleteActual(e!==l.length-1)})}(a||0!==r)&&o.table.rowManager.reRenderInPosition()}return o.origFuncs.splice.apply(t,arguments)}})},N.prototype.unwatchData=function(){if(!1!==this.data)for(var t in this.origFuncs)Object.defineProperty(this.data,t,{enumerable:!0,configurable:!0,writable:!0,value:this.origFuncs.key})},N.prototype.watchRow=function(t){var e=t.getData();this.blocked=!0;for(var o in e)this.watchKey(t,e,o);this.blocked=!1},N.prototype.watchKey=function(t,e,o){var i=this,n=Object.getOwnPropertyDescriptor(e,o),s=e[o],r=this.currentVersion;Object.defineProperty(e,o,{set:function(e){if(s=e,!i.blocked&&r===i.currentVersion){var a={};a[o]=e,t.updateData(a)}n.set&&n.set(e)},get:function(){return n.get&&n.get(),s}})},N.prototype.unwatchRow=function(t){var e=t.getData();for(var o in e)Object.defineProperty(e,o,{value:e[o]})},N.prototype.block=function(){this.blocked=!0},N.prototype.unblock=function(){this.blocked=!1},u.prototype.registerModule("reactiveData",N);var I=function(t){this.table=t,this.startColumn=!1,this.startX=!1,this.startWidth=!1,this.handle=null,this.prevHandle=null};I.prototype.initializeColumn=function(t,e,o){var i=this,n=!1,s=this.table.options.resizableColumns;if("header"===t&&(n="textarea"==e.definition.formatter||e.definition.variableHeight,e.modules.resize={variableHeight:n}),!0===s||s==t){var r=document.createElement("div");r.className="tabulator-col-resize-handle";var a=document.createElement("div");a.className="tabulator-col-resize-handle prev",r.addEventListener("click",function(t){t.stopPropagation()});var l=function(t){var o=e.getLastColumn();o&&i._checkResizability(o)&&(i.startColumn=e,i._mouseDown(t,o,r))};r.addEventListener("mousedown",l),r.addEventListener("touchstart",l,{passive:!0}),r.addEventListener("dblclick",function(t){var o=e.getLastColumn();o&&i._checkResizability(o)&&(t.stopPropagation(),o.reinitializeWidth(!0))}),a.addEventListener("click",function(t){t.stopPropagation()});var c=function(t){var o,n,s;(o=e.getFirstColumn())&&(n=i.table.columnManager.findColumnIndex(o),(s=n>0&&i.table.columnManager.getColumnByIndex(n-1))&&i._checkResizability(s)&&(i.startColumn=e,i._mouseDown(t,s,a)))};a.addEventListener("mousedown",c),a.addEventListener("touchstart",c,{passive:!0}),a.addEventListener("dblclick",function(t){var o,n,s;(o=e.getFirstColumn())&&(n=i.table.columnManager.findColumnIndex(o),(s=n>0&&i.table.columnManager.getColumnByIndex(n-1))&&i._checkResizability(s)&&(t.stopPropagation(),s.reinitializeWidth(!0)))}),o.appendChild(r),o.appendChild(a)}},I.prototype._checkResizability=function(t){return void 0!==t.definition.resizable?t.definition.resizable:this.table.options.resizableColumns},I.prototype._mouseDown=function(t,e,o){function i(t){e.setWidth(s.startWidth+((void 0===t.screenX?t.touches[0].screenX:t.screenX)-s.startX)),!s.table.browserSlow&&e.modules.resize&&e.modules.resize.variableHeight&&e.checkCellHeights()}function n(t){s.startColumn.modules.edit&&(s.startColumn.modules.edit.blocked=!1),s.table.browserSlow&&e.modules.resize&&e.modules.resize.variableHeight&&e.checkCellHeights(),document.body.removeEventListener("mouseup",n),document.body.removeEventListener("mousemove",i),o.removeEventListener("touchmove",i),o.removeEventListener("touchend",n),s.table.element.classList.remove("tabulator-block-select"),s.table.options.persistence&&s.table.modExists("persistence",!0)&&s.table.modules.persistence.config.columns&&s.table.modules.persistence.save("columns"),s.table.options.columnResized.call(s.table,e.getComponent())}var s=this;s.table.element.classList.add("tabulator-block-select"),t.stopPropagation(),s.startColumn.modules.edit&&(s.startColumn.modules.edit.blocked=!0),s.startX=void 0===t.screenX?t.touches[0].screenX:t.screenX,s.startWidth=e.getWidth(),document.body.addEventListener("mousemove",i),document.body.addEventListener("mouseup",n),o.addEventListener("touchmove",i,{passive:!0}),o.addEventListener("touchend",n)},u.prototype.registerModule("resizeColumns",I);var O=function(t){this.table=t,this.startColumn=!1,this.startY=!1,this.startHeight=!1,this.handle=null,this.prevHandle=null};O.prototype.initializeRow=function(t){var e=this,o=t.getElement(),i=document.createElement("div");i.className="tabulator-row-resize-handle";var n=document.createElement("div");n.className="tabulator-row-resize-handle prev",i.addEventListener("click",function(t){t.stopPropagation()});var s=function(o){e.startRow=t,e._mouseDown(o,t,i)};i.addEventListener("mousedown",s),i.addEventListener("touchstart",s,{passive:!0}),n.addEventListener("click",function(t){t.stopPropagation()});var r=function(o){var i=e.table.rowManager.prevDisplayRow(t);i&&(e.startRow=i,e._mouseDown(o,i,n))};n.addEventListener("mousedown",r),n.addEventListener("touchstart",r,{passive:!0}),o.appendChild(i),o.appendChild(n)},O.prototype._mouseDown=function(t,e,o){function i(t){e.setHeight(s.startHeight+((void 0===t.screenY?t.touches[0].screenY:t.screenY)-s.startY))}function n(t){document.body.removeEventListener("mouseup",i),document.body.removeEventListener("mousemove",i),o.removeEventListener("touchmove",i),o.removeEventListener("touchend",n),s.table.element.classList.remove("tabulator-block-select"),s.table.options.rowResized.call(this.table,e.getComponent())}var s=this;s.table.element.classList.add("tabulator-block-select"),t.stopPropagation(),s.startY=void 0===t.screenY?t.touches[0].screenY:t.screenY,s.startHeight=e.getHeight(),document.body.addEventListener("mousemove",i),document.body.addEventListener("mouseup",n),o.addEventListener("touchmove",i,{passive:!0}),o.addEventListener("touchend",n)},u.prototype.registerModule("resizeRows",O);var j=function(t){this.table=t,this.binding=!1,this.observer=!1};j.prototype.initialize=function(t){var e=this.table;"undefined"!=typeof ResizeObserver&&"virtual"===e.rowManager.getRenderMode()?(this.observer=new ResizeObserver(function(t){(!e.browserMobile||e.browserMobile&&!e.modules.edit.currentCell)&&e.redraw()}),this.observer.observe(e.element)):(this.binding=function(){(!e.browserMobile||e.browserMobile&&!e.modules.edit.currentCell)&&e.redraw()},window.addEventListener("resize",this.binding))},j.prototype.clearBindings=function(t){this.binding&&window.removeEventListener("resize",this.binding),this.observer&&this.observer.unobserve(this.table.element)},u.prototype.registerModule("resizeTable",j);var G=function(t){this.table=t,this.columns=[],this.hiddenColumns=[],this.mode="",this.index=0,this.collapseFormatter=[],this.collapseStartOpen=!0,this.collapseHandleColumn=!1};G.prototype.initialize=function(){var t=this,e=[];this.mode=this.table.options.responsiveLayout,this.collapseFormatter=this.table.options.responsiveLayoutCollapseFormatter||this.formatCollapsedData,this.collapseStartOpen=this.table.options.responsiveLayoutCollapseStartOpen,this.hiddenColumns=[],this.table.columnManager.columnsByIndex.forEach(function(o,i){o.modules.responsive&&o.modules.responsive.order&&o.modules.responsive.visible&&(o.modules.responsive.index=i,e.push(o),o.visible||"collapse"!==t.mode||t.hiddenColumns.push(o))}),e=e.reverse(),e=e.sort(function(t,e){return e.modules.responsive.order-t.modules.responsive.order||e.modules.responsive.index-t.modules.responsive.index}),this.columns=e,"collapse"===this.mode&&this.generateCollapsedContent();for(var o=this.table.columnManager.columnsByIndex,i=Array.isArray(o),n=0,o=i?o:o[Symbol.iterator]();;){var s;if(i){if(n>=o.length)break;s=o[n++]}else{if(n=o.next(),n.done)break;s=n.value}var r=s;if("responsiveCollapse"==r.definition.formatter){this.collapseHandleColumn=r;break}}this.collapseHandleColumn&&(this.hiddenColumns.length?this.collapseHandleColumn.show():this.collapseHandleColumn.hide())},G.prototype.initializeColumn=function(t){var e=t.getDefinition();t.modules.responsive={order:void 0===e.responsive?1:e.responsive,visible:!1!==e.visible}},G.prototype.initializeRow=function(t){var e;"calc"!==t.type&&(e=document.createElement("div"),e.classList.add("tabulator-responsive-collapse"),t.modules.responsiveLayout={element:e,open:this.collapseStartOpen},this.collapseStartOpen||(e.style.display="none"))},G.prototype.layoutRow=function(t){var e=t.getElement();t.modules.responsiveLayout&&(e.appendChild(t.modules.responsiveLayout.element),this.generateCollapsedRowContent(t))},G.prototype.updateColumnVisibility=function(t,e){t.modules.responsive&&(t.modules.responsive.visible=e,this.initialize())},G.prototype.hideColumn=function(t){var e=this.hiddenColumns.length;t.hide(!1,!0),"collapse"===this.mode&&(this.hiddenColumns.unshift(t),this.generateCollapsedContent(),this.collapseHandleColumn&&!e&&this.collapseHandleColumn.show())},G.prototype.showColumn=function(t){var e;t.show(!1,!0),t.setWidth(t.getWidth()),"collapse"===this.mode&&(e=this.hiddenColumns.indexOf(t),e>-1&&this.hiddenColumns.splice(e,1),this.generateCollapsedContent(),this.collapseHandleColumn&&!this.hiddenColumns.length&&this.collapseHandleColumn.hide())},G.prototype.update=function(){for(var t=this,e=!0;e;){var o="fitColumns"==t.table.modules.layout.getMode()?t.table.columnManager.getFlexBaseWidth():t.table.columnManager.getWidth(),i=(t.table.options.headerVisible?t.table.columnManager.element.clientWidth:t.table.element.clientWidth)-o;if(i<0){var n=t.columns[t.index];n?(t.hideColumn(n),t.index++):e=!1}else{var s=t.columns[t.index-1];s&&i>0&&i>=s.getWidth()?(t.showColumn(s),t.index--):e=!1}t.table.rowManager.activeRowsCount||t.table.rowManager.renderEmptyScroll()}},G.prototype.generateCollapsedContent=function(){var t=this;this.table.rowManager.getDisplayRows().forEach(function(e){t.generateCollapsedRowContent(e)})},G.prototype.generateCollapsedRowContent=function(t){var e,o;if(t.modules.responsiveLayout){for(e=t.modules.responsiveLayout.element;e.firstChild;)e.removeChild(e.firstChild);o=this.collapseFormatter(this.generateCollapsedRowData(t)),o&&e.appendChild(o)}},G.prototype.generateCollapsedRowData=function(t){var e,o=this,i=t.getData(),n=[];return this.hiddenColumns.forEach(function(s){var r=s.getFieldValue(i);s.definition.title&&s.field&&(s.modules.format&&o.table.options.responsiveLayoutCollapseUseFormatters?(e={value:!1,data:{},getValue:function(){return r},getData:function(){return i},getElement:function(){return document.createElement("div")},getRow:function(){return t.getComponent()},getColumn:function(){return s.getComponent()}},n.push({title:s.definition.title,value:s.modules.format.formatter.call(o.table.modules.format,e,s.modules.format.params)})):n.push({title:s.definition.title,value:r}))}),n},G.prototype.formatCollapsedData=function(t){var e=document.createElement("table"),o="";return t.forEach(function(t){var e=document.createElement("div");t.value instanceof Node&&(e.appendChild(t.value),t.value=e.innerHTML),o+="<tr><td><strong>"+t.title+"</strong></td><td>"+t.value+"</td></tr>"}),e.innerHTML=o,Object.keys(t).length?e:""},u.prototype.registerModule("responsiveLayout",G);var V=function(t){this.table=t,this.selecting=!1,this.lastClickedRow=!1,this.selectPrev=[],this.selectedRows=[],this.headerCheckboxElement=null};V.prototype.clearSelectionData=function(t){this.selecting=!1,this.lastClickedRow=!1,this.selectPrev=[],this.selectedRows=[],t||this._rowSelectionChanged()},V.prototype.initializeRow=function(t){var e=this,o=t.getElement(),i=function t(){setTimeout(function(){e.selecting=!1},50),document.body.removeEventListener("mouseup",t)};t.modules.select={selected:!1},e.table.options.selectableCheck.call(this.table,t.getComponent())?(o.classList.add("tabulator-selectable"),o.classList.remove("tabulator-unselectable"),e.table.options.selectable&&"highlight"!=e.table.options.selectable&&("click"===e.table.options.selectableRangeMode?o.addEventListener("click",function(o){if(o.shiftKey){e.table._clearSelection(),e.lastClickedRow=e.lastClickedRow||t;var i=e.table.rowManager.getDisplayRowIndex(e.lastClickedRow),n=e.table.rowManager.getDisplayRowIndex(t),s=i<=n?i:n,r=i>=n?i:n,a=e.table.rowManager.getDisplayRows().slice(0),l=a.splice(s,r-s+1);o.ctrlKey||o.metaKey?(l.forEach(function(o){o!==e.lastClickedRow&&(!0===e.table.options.selectable||e.isRowSelected(t)?e.toggleRow(o):e.selectedRows.length<e.table.options.selectable&&e.toggleRow(o))}),e.lastClickedRow=t):(e.deselectRows(),!0!==e.table.options.selectable&&l.length>e.table.options.selectable&&(l=l.slice(0,e.table.options.selectable)),e.selectRows(l)),e.table._clearSelection()}else o.ctrlKey||o.metaKey?(e.toggleRow(t),e.lastClickedRow=t):(e.deselectRows(),e.selectRows(t),e.lastClickedRow=t)}):(o.addEventListener("click",function(o){e.table.modExists("edit")&&e.table.modules.edit.getCurrentCell()||e.table._clearSelection(),e.selecting||e.toggleRow(t)}),o.addEventListener("mousedown",function(o){if(o.shiftKey)return e.table._clearSelection(),e.selecting=!0,e.selectPrev=[],document.body.addEventListener("mouseup",i),document.body.addEventListener("keyup",i),e.toggleRow(t),!1}),o.addEventListener("mouseenter",function(o){e.selecting&&(e.table._clearSelection(),e.toggleRow(t),e.selectPrev[1]==t&&e.toggleRow(e.selectPrev[0]))}),o.addEventListener("mouseout",function(o){e.selecting&&(e.table._clearSelection(),e.selectPrev.unshift(t))})))):(o.classList.add("tabulator-unselectable"),o.classList.remove("tabulator-selectable"))},V.prototype.toggleRow=function(t){this.table.options.selectableCheck.call(this.table,t.getComponent())&&(t.modules.select&&t.modules.select.selected?this._deselectRow(t):this._selectRow(t))},V.prototype.selectRows=function(t){var e,o=this;switch(void 0===t?"undefined":_typeof(t)){case"undefined":this.table.rowManager.rows.forEach(function(t){o._selectRow(t,!0,!0)}),this._rowSelectionChanged();break;case"string":e=this.table.rowManager.findRow(t),e?this._selectRow(e,!0,!0):this.table.rowManager.getRows(t).forEach(function(t){o._selectRow(t,!0,!0)}),this._rowSelectionChanged();break;default:Array.isArray(t)?(t.forEach(function(t){o._selectRow(t,!0,!0)}),this._rowSelectionChanged()):this._selectRow(t,!1,!0)}},V.prototype._selectRow=function(t,e,o){if(!isNaN(this.table.options.selectable)&&!0!==this.table.options.selectable&&!o&&this.selectedRows.length>=this.table.options.selectable){if(!this.table.options.selectableRollingSelection)return!1;this._deselectRow(this.selectedRows[0])}var i=this.table.rowManager.findRow(t);i?-1==this.selectedRows.indexOf(i)&&(i.modules.select||(i.modules.select={}),i.modules.select.selected=!0,i.modules.select.checkboxEl&&(i.modules.select.checkboxEl.checked=!0),i.getElement().classList.add("tabulator-selected"),this.selectedRows.push(i),e||(this.table.options.rowSelected.call(this.table,i.getComponent()),this._rowSelectionChanged())):e||console.warn("Selection Error - No such row found, ignoring selection:"+t)},V.prototype.isRowSelected=function(t){return-1!==this.selectedRows.indexOf(t)},V.prototype.deselectRows=function(t){var e,o=this;if(void 0===t){e=o.selectedRows.length;for(var i=0;i<e;i++)o._deselectRow(o.selectedRows[0],!0);o._rowSelectionChanged()}else Array.isArray(t)?(t.forEach(function(t){o._deselectRow(t,!0)}),o._rowSelectionChanged()):o._deselectRow(t)},V.prototype._deselectRow=function(t,e){var o,i=this,n=i.table.rowManager.findRow(t);n?(o=i.selectedRows.findIndex(function(t){return t==n}))>-1&&(n.modules.select||(n.modules.select={}),n.modules.select.selected=!1,n.modules.select.checkboxEl&&(n.modules.select.checkboxEl.checked=!1),n.getElement().classList.remove("tabulator-selected"),i.selectedRows.splice(o,1),e||(i.table.options.rowDeselected.call(this.table,n.getComponent()),i._rowSelectionChanged())):e||console.warn("Deselection Error - No such row found, ignoring selection:"+t)},V.prototype.getSelectedData=function(){var t=[];return this.selectedRows.forEach(function(e){t.push(e.getData())}),t},V.prototype.getSelectedRows=function(){var t=[];return this.selectedRows.forEach(function(e){t.push(e.getComponent())}),t},V.prototype._rowSelectionChanged=function(){this.headerCheckboxElement&&(0===this.selectedRows.length?(this.headerCheckboxElement.checked=!1,this.headerCheckboxElement.indeterminate=!1):this.table.rowManager.rows.length===this.selectedRows.length?(this.headerCheckboxElement.checked=!0,this.headerCheckboxElement.indeterminate=!1):(this.headerCheckboxElement.indeterminate=!0,this.headerCheckboxElement.checked=!1)),this.table.options.rowSelectionChanged.call(this.table,this.getSelectedData(),this.getSelectedRows())},V.prototype.registerRowSelectCheckbox=function(t,e){t._row.modules.select||(t._row.modules.select={}),t._row.modules.select.checkboxEl=e},V.prototype.registerHeaderSelectCheckbox=function(t){this.headerCheckboxElement=t},u.prototype.registerModule("selectRow",V);var W=function(t){this.table=t,this.sortList=[],this.changed=!1};W.prototype.initializeColumn=function(t,e){var o,i,n=this,s=!1;switch(_typeof(t.definition.sorter)){case"string":n.sorters[t.definition.sorter]?s=n.sorters[t.definition.sorter]:console.warn("Sort Error - No such sorter found: ",t.definition.sorter);break;case"function":s=t.definition.sorter}t.modules.sort={sorter:s,dir:"none",params:t.definition.sorterParams||{},startingDir:t.definition.headerSortStartingDir||"asc",tristate:void 0!==t.definition.headerSortTristate?t.definition.headerSortTristate:this.table.options.headerSortTristate},(void 0===t.definition.headerSort?!1!==this.table.options.headerSort:!1!==t.definition.headerSort)&&(o=t.getElement(),o.classList.add("tabulator-sortable"),i=document.createElement("div"),i.classList.add("tabulator-arrow"),e.appendChild(i),o.addEventListener("click",function(e){var o="",i=[],s=!1;if(t.modules.sort){if(t.modules.sort.tristate)o="none"==t.modules.sort.dir?t.modules.sort.startingDir:t.modules.sort.dir==t.modules.sort.startingDir?"asc"==t.modules.sort.dir?"desc":"asc":"none";else switch(t.modules.sort.dir){case"asc":o="desc";break;case"desc":o="asc";break;default:o=t.modules.sort.startingDir}n.table.options.columnHeaderSortMulti&&(e.shiftKey||e.ctrlKey)?(i=n.getSort(),s=i.findIndex(function(e){return e.field===t.getField()}),s>-1?(i[s].dir=o,s!=i.length-1&&(s=i.splice(s,1)[0],"none"!=o&&i.push(s))):"none"!=o&&i.push({column:t,dir:o}),n.setSort(i)):"none"==o?n.clear():n.setSort(t,o),n.table.rowManager.sorterRefresh(!n.sortList.length)}}))},W.prototype.hasChanged=function(){var t=this.changed;return this.changed=!1,t},W.prototype.getSort=function(){var t=this,e=[];return t.sortList.forEach(function(t){t.column&&e.push({column:t.column.getComponent(),field:t.column.getField(),dir:t.dir})}),e},W.prototype.setSort=function(t,e){var o=this,i=[];Array.isArray(t)||(t=[{column:t,dir:e}]),t.forEach(function(t){var e;e=o.table.columnManager.findColumn(t.column),e?(t.column=e,i.push(t),o.changed=!0):console.warn("Sort Warning - Sort field does not exist and is being ignored: ",t.column)}),o.sortList=i,this.table.options.persistence&&this.table.modExists("persistence",!0)&&this.table.modules.persistence.config.sort&&this.table.modules.persistence.save("sort")},W.prototype.clear=function(){this.setSort([])},W.prototype.findSorter=function(t){var e,o=this.table.rowManager.activeRows[0],i="string";if(o&&(o=o.getData(),t.getField()))switch(e=t.getFieldValue(o),void 0===e?"undefined":_typeof(e)){case"undefined":i="string";break;case"boolean":i="boolean";break;default:isNaN(e)||""===e?e.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)&&(i="alphanum"):i="number"}return this.sorters[i]},W.prototype.sort=function(t){var e,o=this;e=this.table.options.sortOrderReverse?o.sortList.slice().reverse():o.sortList,o.table.options.dataSorting&&o.table.options.dataSorting.call(o.table,o.getSort()),o.clearColumnHeaders(),o.table.options.ajaxSorting?e.forEach(function(t,e){o.setColumnHeader(t.column,t.dir)}):e.forEach(function(i,n){i.column&&i.column.modules.sort&&(i.column.modules.sort.sorter||(i.column.modules.sort.sorter=o.findSorter(i.column)),o._sortItem(t,i.column,i.dir,e,n)),o.setColumnHeader(i.column,i.dir)}),o.table.options.dataSorted&&o.table.options.dataSorted.call(o.table,o.getSort(),o.table.rowManager.getComponents("active"))},W.prototype.clearColumnHeaders=function(){this.table.columnManager.getRealColumns().forEach(function(t){t.modules.sort&&(t.modules.sort.dir="none",t.getElement().setAttribute("aria-sort","none"))})},W.prototype.setColumnHeader=function(t,e){t.modules.sort.dir=e,t.getElement().setAttribute("aria-sort",e)},W.prototype._sortItem=function(t,e,o,i,n){var s=this,r="function"==typeof e.modules.sort.params?e.modules.sort.params(e.getComponent(),o):e.modules.sort.params;t.sort(function(t,a){var l=s._sortRow(t,a,e,o,r);if(0===l&&n)for(var c=n-1;c>=0&&0===(l=s._sortRow(t,a,i[c].column,i[c].dir,r));c--);return l})},W.prototype._sortRow=function(t,e,o,i,n){var s,r,a="asc"==i?t:e,l="asc"==i?e:t;return t=o.getFieldValue(a.getData()),e=o.getFieldValue(l.getData()),t=void 0!==t?t:"",e=void 0!==e?e:"",s=a.getComponent(),r=l.getComponent(),o.modules.sort.sorter.call(this,t,e,s,r,o.getComponent(),i,n)},W.prototype.sorters={number:function(t,e,o,i,n,s,r){var a=r.alignEmptyValues,l=r.decimalSeparator||".",c=r.thousandSeparator||",",u=0;if(t=parseFloat(String(t).split(c).join("").split(l).join(".")),e=parseFloat(String(e).split(c).join("").split(l).join(".")),isNaN(t))u=isNaN(e)?0:-1;else{if(!isNaN(e))return t-e;u=1}return("top"===a&&"desc"===s||"bottom"===a&&"asc"===s)&&(u*=-1),u},string:function(t,e,o,i,n,s,r){var a,l=r.alignEmptyValues,c=0;if(t){if(e){switch(_typeof(r.locale)){case"boolean":r.locale&&(a=this.table.modules.localize.getLocale());break;case"string":a=r.locale}return String(t).toLowerCase().localeCompare(String(e).toLowerCase(),a)}c=1}else c=e?-1:0;return("top"===l&&"desc"===s||"bottom"===l&&"asc"===s)&&(c*=-1),c},date:function(t,e,o,i,n,s,r){return r.format||(r.format="DD/MM/YYYY"),this.sorters.datetime.call(this,t,e,o,i,n,s,r)},time:function(t,e,o,i,n,s,r){return r.format||(r.format="hh:mm"),this.sorters.datetime.call(this,t,e,o,i,n,s,r)},datetime:function(t,e,o,i,n,s,r){var a=r.format||"DD/MM/YYYY hh:mm:ss",l=r.alignEmptyValues,c=0;if("undefined"!=typeof moment){if(t=moment(t,a),e=moment(e,a),t.isValid()){if(e.isValid())return t-e;c=1}else c=e.isValid()?-1:0;return("top"===l&&"desc"===s||"bottom"===l&&"asc"===s)&&(c*=-1),c}console.error("Sort Error - 'datetime' sorter is dependant on moment.js")},boolean:function(t,e,o,i,n,s,r){return(!0===t||"true"===t||"True"===t||1===t?1:0)-(!0===e||"true"===e||"True"===e||1===e?1:0)},array:function(t,e,o,i,n,s,r){function a(t){switch(u){case"length":return t.length;case"sum":return t.reduce(function(t,e){return t+e});case"max":return Math.max.apply(null,t);case"min":return Math.min.apply(null,t);case"avg":return t.reduce(function(t,e){return t+e})/t.length}}var l=0,c=0,u=r.type||"length",d=r.alignEmptyValues,h=0;if(Array.isArray(t)){if(Array.isArray(e))return l=t?a(t):0,c=e?a(e):0,l-c;d=1}else d=Array.isArray(e)?-1:0;return("top"===d&&"desc"===s||"bottom"===d&&"asc"===s)&&(h*=-1),h},exists:function(t,e,o,i,n,s,r){return(void 0===t?0:1)-(void 0===e?0:1)},alphanum:function(t,e,o,i,n,s,r){var a,l,c,u,d,h=0,p=/(\d+)|(\D+)/g,m=/\d/,f=r.alignEmptyValues,g=0;if(t||0===t){if(e||0===e){if(isFinite(t)&&isFinite(e))return t-e;if(a=String(t).toLowerCase(),l=String(e).toLowerCase(),a===l)return 0;if(!m.test(a)||!m.test(l))return a>l?1:-1;for(a=a.match(p),l=l.match(p),d=a.length>l.length?l.length:a.length;h<d;)if(c=a[h],u=l[h++],c!==u)return isFinite(c)&&isFinite(u)?("0"===c.charAt(0)&&(c="."+c),"0"===u.charAt(0)&&(u="."+u),c-u):c>u?1:-1;return a.length>l.length}g=1}else g=e||0===e?-1:0;return("top"===f&&"desc"===s||"bottom"===f&&"asc"===s)&&(g*=-1),g}},u.prototype.registerModule("sort",W);var U=function(t){this.table=t};return U.prototype.initializeColumn=function(t){var e,o=this,i=[];t.definition.validator&&(Array.isArray(t.definition.validator)?t.definition.validator.forEach(function(t){(e=o._extractValidator(t))&&i.push(e)}):(e=this._extractValidator(t.definition.validator))&&i.push(e),t.modules.validate=!!i.length&&i)},U.prototype._extractValidator=function(t){var e,o,i;switch(void 0===t?"undefined":_typeof(t)){case"string":return i=t.indexOf(":"),i>-1?(e=t.substring(0,i),o=t.substring(i+1)):e=t,this._buildValidator(e,o);case"function":return this._buildValidator(t);case"object":return this._buildValidator(t.type,t.parameters)}},U.prototype._buildValidator=function(t,e){var o="function"==typeof t?t:this.validators[t];return o?{type:"function"==typeof t?"function":t,func:o,params:e}:(console.warn("Validator Setup Error - No matching validator found:",t),!1)},U.prototype.validate=function(t,e,o){var i=this,n=[];return t&&t.forEach(function(t){t.func.call(i,e,o,t.params)||n.push({type:t.type,parameters:t.params})}),!n.length||n},U.prototype.validators={integer:function(t,e,o){return""===e||null===e||void 0===e||"number"==typeof(e=Number(e))&&isFinite(e)&&Math.floor(e)===e},float:function(t,e,o){return""===e||null===e||void 0===e||"number"==typeof(e=Number(e))&&isFinite(e)&&e%1!=0},numeric:function(t,e,o){return""===e||null===e||void 0===e||!isNaN(e)},string:function(t,e,o){return""===e||null===e||void 0===e||isNaN(e)},max:function(t,e,o){return""===e||null===e||void 0===e||parseFloat(e)<=o},min:function(t,e,o){return""===e||null===e||void 0===e||parseFloat(e)>=o},minLength:function(t,e,o){return""===e||null===e||void 0===e||String(e).length>=o},maxLength:function(t,e,o){return""===e||null===e||void 0===e||String(e).length<=o},in:function(t,e,o){return""===e||null===e||void 0===e||("string"==typeof o&&(o=o.split("|")),""===e||o.indexOf(e)>-1)},regex:function(t,e,o){return""===e||null===e||void 0===e||new RegExp(o).test(e)},unique:function(t,e,o){if(""===e||null===e||void 0===e)return!0;var i=!0,n=t.getData(),s=t.getColumn()._getSelf();return this.table.rowManager.rows.forEach(function(t){var o=t.getData();o!==n&&e==s.getFieldValue(o)&&(i=!1)}),i},required:function(t,e,o){return""!==e&&null!==e&&void 0!==e}},u.prototype.registerModule("validate",U),u});

/*seg_desktop.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.3";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
	u.txt = function(index) {return index;}
}
function fun(v) {return (typeof(v) === "function")}
function obj(v) {return (typeof(v) === "object")}
function str(v) {return (typeof(v) === "string")}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	console.log("Util.nodeId IS DEPRECATED. Use commas in u.bug in stead.");
	console.log(arguments.callee.caller);
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	console.error(_exception);
	u.bug("Invoked with arguments:");
	console.log(_arguments);
}
Util.bug = function() {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var i, message;
			if(obj(console)) {
				for(i = 0; i < arguments.length; i++) {
					if(arguments[i] || typeof(arguments[i]) == "undefined") {
						console.log(arguments[i]);
					}
				}
			}
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			var corner = u.bug_corner ? u.bug_corner : 0;
			var color = u.bug_color ? u.bug_color : "black";
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.fontSize = "11px";
				d_target.style.lineHeight = "11px";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "2px 3px";
			}
			for(i = 0; i < arguments.length; i++) {
				if(arguments[i] === undefined) {
					message = "undefined";
				}
				else if(!str(arguments[i]) && fun(arguments[i].toString)) {
					message = arguments[i].toString();
				}
				else {
					message = arguments[i];
				}
				var debug_div = document.getElementById("debug_id_"+corner);
				message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
				u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
			}
		}
		else if(typeof(console) !== "undefined" && obj(console)) {
			var i;
			for(i = 0; i < arguments.length; i++) {
				console.log(arguments[i]);
			}
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && obj(object[x]) && !str(object[x].nodeName)) {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && obj(object[x]) && str(object[x].nodeName)) {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && fun(object[x])) {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
	 			else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(fun(callback)) {
								var key = u.randomString(4);
								node[key] = callback;
								node[key](event);
								delete node[key];
								callback = null;
							}
							else if(fun(this[callback])) {
								this[callback](event);
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		if(event.target == this) {
			u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
			u.a.transition(event.target, "none");
			if(fun(this.transitioned)) {
				this.transitioned_before = this.transitioned;
				this.transitioned(event);
				if(this.transitioned === this.transitioned_before) {
					delete this.transitioned;
				}
			}
		}
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
		node.offsetHeight;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
		node.offsetHeight;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
		node.offsetHeight;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
		node.offsetHeight;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					if(fun(animation.node[animation.callback])) {
						animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
					}
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		if(fun(animation.node[animation.callback])) {
			animation.node[animation.callback](1);
		}
		if(fun(animation.node.transitioned)) {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	var force = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
				case "force"	: force		= _options[_argument]; break;
			}
		}
	}
	if(!force && obj(window.localStorage) && obj(window.sessionStorage)) {
		if(expires === true) {
			window.sessionStorage.setItem(name, value);
		}
		else {
			window.localStorage.setItem(name, value);
		}
		return;
	}
	if(expires === false) {
		expires = ";expires=Mon, 04-Apr-2020 05:00:00 GMT";
	}
	else if(str(expires)) {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires;
}
Util.getCookie = function(name) {
	var matches;
	if(obj(window.sessionStorage) && window.sessionStorage.getItem(name)) {
		return window.sessionStorage.getItem(name)
	}
	else if(obj(window.localStorage) && window.localStorage.getItem(name)) {
		return window.localStorage.getItem(name)
	}
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(obj(window.sessionStorage)) {
		window.sessionStorage.removeItem(name);
	}
	if(obj(window.localStorage)) {
		window.localStorage.removeItem(name);
	}
	if(str(path)) {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/\b[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+\b/g, "").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(new Date(timestamp.replace(/ /, "T"))) {
			date = new Date(timestamp.replace(/ /, "T"));
		}
		else {
			if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
				if(timestamp.match(/ \+[0-9]{4}/)) {
					date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
				}
			}
		}
		if(isNaN(date.getTime())) {
			date = new Date();
		}
	}
	var tokens = /d|j|m|n|F|Y|G|H|i|s/g;
	var chars = new Object();
	chars.j = date.getDate();
	chars.d = (chars.j > 9 ? "" : "0") + chars.j;
	chars.n = date.getMonth()+1;
	chars.m = (chars.n > 9 ? "" : "0") + chars.n;
	chars.F = months ? months[date.getMonth()] : "";
	chars.Y = date.getFullYear();
	chars.G = date.getHours();
	chars.H = (chars.G > 9 ? "" : "0") + chars.G;
	var i = date.getMinutes();
	chars.i = (i > 9 ? "" : "0") + i;
	var s = date.getSeconds();
	chars.s = (s > 9 ? "" : "0") + s;
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, nodes, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, nodes, i, regexp;
	var return_nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	nodes = scope.getElementsByTagName("*");
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(regexp.test(node.className)) {
			return_nodes.push(node);
		}
	}
	return return_nodes.length ? return_nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; i < node.childNodes.length; i++) {
		child = node.childNodes[i]
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
		node = _parent.insertBefore(node, _parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ie", arguments, exception);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(obj(u.e) && fun(u.e.click)) {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(fun(node.preClicked)) {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey)) {
					window.open(this.url);
				}
				else {
					if(obj(u.h) && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp("(\^| )" + var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		var match = node.className.match(regexp);
		if(match) {
			return match[0].replace(var_name + ":", "").trim();
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname, dom_update) {
	var old_class;
	if(node instanceof SVGElement) {
		old_class = node.className.baseVal;
		node.setAttribute("class", classname);
	}
	else {
		old_class = node.className;
		node.className = classname;
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return old_class;
}
Util.hasClass = u.hc = function(node, classname) {
	if(node.classList.contains(classname)) {
		return true;
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
		if(node instanceof SVGElement) {
			if(regexp.test(node.className.baseVal)) {
				return true;
			}
		}
		else {
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	var classnames = classname.split(" ");
	while(classnames.length) {
		node.classList.add(classnames.shift());
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	if(node.classList.contains(classname)) {
		node.classList.remove(classname);
	}
	else {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(?=[\\s]|$)", "g");
		if(node instanceof SVGElement) {
			node.setAttribute("class", node.className.baseVal.replace(regexp, " ").trim().replace(/[\s]{2}/g, " "));
		}
		else {
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	if(u.hc(node, classname)) {
		u.rc(node, classname, dom_update);
		if(_classname) {
			u.ac(node, _classname, dom_update);
		}
	}
	else {
		u.ac(node, classname);
		if(_classname) {
			u.rc(node, _classname, dom_update);
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
	return node.className;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			if(obj(u.a) && style == "transition") {
				u.a.transition(node, styles[style]);
			}
			else {
				node.style[u.vendorProperty(style)] = styles[style];
			}
		}
	}
	dom_update = (dom_update === false) || (node.offsetTop);
}
Util.getComputedStyle = u.gcs = function(node, property) {
	var dom_update = node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	return window.getComputedStyle(node, null).getPropertyValue(property);
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
u.contains = function(scope, node) {
	if(scope != node) {
		if(scope.contains(node)) {
			return true
		}
	}
	return false;
}
u.containsOrIs = function(scope, node) {
	if(scope == node || u.contains(scope, node)) {
		return true
	}
	return false;
}
u.elementMatches = u.em = function(node, selector) {
	return node.matches(selector);
}
Util.insertAfter = u.ia = function(after_node, insert_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(next_node, insert_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; i < list.length; i++) {
		list_node = list[i]
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
u.easings = new function() {
	this["ease-in"] = function(progress) {
		return Math.pow((progress), 3);
	}
	this["linear"] = function(progress) {
		return progress;
	}
	this["ease-out"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 3);
	}
	this["linear"] = function(progress) {
		return (progress);
	}
	this["ease-in-out-veryslow"] = function(progress) {
		if(progress > 0.5) {
			return 4*Math.pow((progress-1),3)+1;
		}
		return 4*Math.pow(progress,3);  
	}
	this["ease-in-out"] = function(progress) {
		if(progress > 0.5) {
			return 1 - Math.pow(1 - ((progress)), 2);
		}
		return Math.pow((progress), 2);
	}
	this["ease-out-slow"] = function(progress) {
		return 1 - Math.pow(1 - ((progress)), 2);
	}
	this["ease-in-slow"] = function(progress) {
		return Math.pow((progress), 2);
	}
	this["ease-in-veryslow"] = function(progress) {
		return Math.pow((progress), 1.5);
	}
	this["ease-in-fast"] = function(progress) {
		return Math.pow((progress), 4);
	}
	this["easeOutQuad"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		return -c * t*(t-2) + b;
	};
	this["easeOutCubic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	this["easeOutQuint"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		t /= d;
		t--;
		return c*(t*t*t*t*t + 1) + b;
	};
	this["easeInOutSine"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	};
	this["easeInOutElastic"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	}
	this["easeOutBounce"] = function (progress) {
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
	}
	this["easeInBack"] = function (progress) {
		var s = 1.70158;
		d = 1;
		b = 0;
		c = progress;
		t = progress;
			return c*(t/=d)*t*((s+1)*t - s) + b;
	}
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if (navigator.userAgent.match(/Windows/i) && ((obj(document.ontouchmove) && obj(document.onmousemove)) || (fun(document.ontouchmove) && fun(document.onmousemove)))) {
		this.event_support = "multi";
	}
	else if (obj(document.ontouchmove) || fun(document.ontouchmove)) {
		this.event_support = "touch";
	}
	else {
		this.event_support = "mouse";
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.addEvent", arguments, exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.exception("u.e.removeEvent", arguments, exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mouseup", this._rightclicked);
		this.removeEvent(node, "touchend", this._rightclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(fun(this.resetDragEvents)) {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this.swiped = false;
		if(!event.button) {
			if(this.e_click || this.e_dblclick || this.e_hold) {
				if(event.type.match(/mouse/)) {
					var node = this;
					while(node) {
						if(node.e_drag || node.e_swipe) {
							u.e.addMoveEvent(this, u.e._cancelClick);
							break;
						}
						else {
							node = node.parentNode;
						}
					}
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._dblclicked);
				if(this.e_hold) {
					this.t_held = u.t.setTimer(this, u.e._held, 750);
				}
			}
			if(this.e_drag || this.e_swipe) {
				u.e.addMoveEvent(this, u.e._pick);
				u.e.addEndEvent(this, u.e._cancelPick);
			}
			if(this.e_scroll) {
				u.e.addMoveEvent(this, u.e._scrollStart);
				u.e.addEndEvent(this, u.e._scrollEnd);
			}
		}
		else if(event.button === 2) {
			if(this.e_rightclick) {
				if(event.type.match(/mouse/)) {
					u.e.addEvent(this, "mouseout", u.e._cancelClick);
				}
				else {
					u.e.addMoveEvent(this, u.e._cancelClick);
				}
				u.e.addMoveEvent(this, u.e._move);
				u.e.addEndEvent(this, u.e._rightclicked);
			}
		}
		if(fun(this.inputStarted)) {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(fun(this.clickCancelled)) {
				this.clickCancelled(event);
			}
		}
	}
	this._move = function(event) {
		if(fun(this.moved)) {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = event;
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(fun(this.held)) {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = event;
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.clicked)) {
			this.clicked(event);
		}
	}
	this.rightclick = function(node, _options) {
		node.e_rightclick_options = _options ? _options : {};
		node.e_rightclick_options.eventAction = u.stringOr(node.e_rightclick_options.eventAction, "RightClicked");
		node.e_rightclick = true;
		u.e.addStartEvent(node, this._inputStart);
		u.e.addEvent(node, "contextmenu", function(event){u.e.kill(event);});
	}
	this._rightclicked = function(event) {
		u.bug("_rightclicked:", this);
		if(this.e_rightclick_options) {
			this.e_rightclick_options.event = event;
			u.stats.event(this, this.e_rightclick_options);
		}
		u.e.resetNestedEvents(this);
		if(fun(this.rightclicked)) {
			this.rightclicked(event);
		}
	}
	this.dblclick = this.doubleclick = this.doubletap = this.dbltap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = event;
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(fun(this.dblclicked)) {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._hover_over_delay = 0;
		node._callback_out = "out";
		node._callback_over = "over";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay_over"		: node._hover_over_delay	= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this._hover_over_delay) {
			u.e.__over.call(this, event);
		}
		else if(!u.t.valid(this.t_over)) {
			this.t_over = u.t.setTimer(this, u.e.__over, this._hover_over_delay, event);
		}
	}
	this.__over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this.is_hovered) {
			this.is_hovered = true;
			u.e.removeOverEvent(this, u.e._over);
			u.e.addOverEvent(this, u.e.__over);
			if(fun(this[this._callback_over])) {
				this[this._callback_over](event);
			}
		}
	}
	this._out = function(event) {
		u.t.resetTimer(this.t_over);
		u.t.resetTimer(this.t_out);
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		u.e.removeOverEvent(this, u.e.__over);
		u.e.addOverEvent(this, u.e._over);
		if(fun(this[this._callback_out])) {
			this[this._callback_out](event);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+' = '+action+'; window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {if(fun(window["_OnWindowEvent_node_'+ id + '"]["'+action+'"])) {window["_OnWindowEvent_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, type, window["_OnWindowEvent_callback_" + id]);
	return id;
}
u.e.removeWindowEvent = function(node, type, id) {
	u.e.removeEvent(window, type, window["_OnWindowEvent_callback_"+id]);
	delete window["_OnWindowEvent_node_"+id];
	delete window["_OnWindowEvent_callback_"+id];
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_Onstart_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+' = '+action+'; window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {if(fun(window["_Onstart_node_'+ id + '"]["'+action+'"])) {window["_Onstart_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addStartEvent(window, window["_Onstart_callback_" + id]);
	return id;
}
u.e.removeWindowStartEvent = function(node, id) {
	u.e.removeStartEvent(window, window["_Onstart_callback_"+id]);
	delete window["_Onstart_node_"+id]["_Onstart_callback_"+id];
	delete window["_Onstart_node_"+id];
	delete window["_Onstart_callback_"+id];
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_Onmove_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+' = '+action+'; window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {if(fun(window["_Onmove_node_'+ id + '"]["'+action+'"])) {window["_Onmove_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addMoveEvent(window, window["_Onmove_callback_" + id]);
	return id;
}
u.e.removeWindowMoveEvent = function(node, id) {
	u.e.removeMoveEvent(window, window["_Onmove_callback_" + id]);
	delete window["_Onmove_node_"+ id]["_Onmove_callback_"+id];
	delete window["_Onmove_node_"+ id];
	delete window["_Onmove_callback_"+ id];
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_Onend_node_"+ id] = node;
	if(fun(action)) {
		eval('window["_Onend_callback_' + id + '"] = function(event) {window["_Onend_node_'+ id + '"]._Onend_callback_'+id+' = '+action+'; window["_Onend_node_'+ id + '"]._Onend_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onend_callback_' + id + '"] = function(event) {if(fun(window["_Onend_node_'+ id + '"]["'+action+'"])) {window["_Onend_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEndEvent(window, window["_Onend_callback_" + id]);
	return id;
}
u.e.removeWindowEndEvent = function(node, id) {
	u.e.removeEndEvent(window, window["_Onend_callback_" + id]);
	delete window["_Onend_node_"+ id]["_Onend_callback_"+id];
	delete window["_Onend_node_"+ id];
	delete window["_Onend_callback_"+ id];
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customDataFormat = {};
	this.customHintPosition = {};
	this.customLabelStyle = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_input;
		_form._bulk_operation = true;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._validation = true;
		_form._debug = false;
		_form._label_style = u.cv(_form, "labelstyle");
		_form._callback_ready = "ready";
		_form._callback_submitted = "submitted";
		_form._callback_pre_submitted = "preSubmitted";
		_form._callback_resat = "resat";
		_form._callback_updated = "updated";
		_form._callback_changed = "changed";
		_form._callback_blurred = "blurred";
		_form._callback_focused = "focused";
		_form._callback_validation_failed = "validationFailed";
		_form._callback_validation_passed = "validationPassed";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"               : _form._validation                = _options[_argument]; break;
					case "debug"                    : _form._debug                     = _options[_argument]; break;
					case "focus_z"                  : _form._focus_z_index             = _options[_argument]; break;
					case "label_style"              : _form._label_style               = _options[_argument]; break;
					case "callback_ready"           : _form._callback_ready            = _options[_argument]; break;
					case "callback_submitted"       : _form._callback_submitted        = _options[_argument]; break;
					case "callback_pre_submitted"   : _form._callback_pre_submitted    = _options[_argument]; break;
					case "callback_resat"           : _form._callback_resat            = _options[_argument]; break;
					case "callback_updated"         : _form._callback_updated          = _options[_argument]; break;
					case "callback_changed"         : _form._callback_changed          = _options[_argument]; break;
					case "callback_blurred"         : _form._callback_blurred          = _options[_argument]; break;
					case "callback_focused"         : _form._callback_focused          = _options[_argument]; break;
					case "callback_validation_failed"         : _form._callback_validation_failed          = _options[_argument]; break;
					case "callback_validation_passed"         : _form._callback_validation_passed          = _options[_argument]; break;
				}
			}
		}
		_form._hover_z_index = _form._focus_z_index - 1;
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.getData = function(_options) {
			return u.f.getFormData(this, _options);
		}
		_form.inputs = {};
		_form.actions = {};
		_form._error_inputs = {};
		var fields = u.qsa(".field", _form);
		for(i = 0; i < fields.length; i++) {
			field = fields[i];
			u.f.initField(_form, field);
		}
		var hidden_inputs = u.qsa("input[type=hidden]", _form);
		for(i = 0; i < hidden_inputs.length; i++) {
			hidden_input = hidden_inputs[i];
			if(!_form.inputs[hidden_input.name]) {
				_form.inputs[hidden_input.name] = hidden_input;
				hidden_input._form = _form;
				hidden_input.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; i < actions.length; i++) {
			action = actions[i];
			this.initButton(_form, action);
		}
		u.t.setTimer(_form, function() {
			var validate_inputs = [];
			for(input in this.inputs) {
				if(this.inputs[input].field) {
					validate_inputs.push(this.inputs[input]);
				}
			}
			u.f.bulkValidate(validate_inputs);
			if(_form._debug) {
				u.bug(_form, "inputs:", _form.inputs, "actions:", _form.actions);
			}
			if(fun(this[this._callback_ready])) {
				this[this._callback_ready]();
			}
		}, 100);
	}
	this.initField = function(_form, field) {
		field._form = _form;
		field._base_z_index = u.gcs(field, "z-index");
		field.help = u.qs(".help", field);
		field.hint = u.qs(".hint", field);
		field.error = u.qs(".error", field);
		field.label = u.qs("label", field);
		field.indicator = u.ae(field, "div", {"class":"indicator"});
		if(fun(u.f.fixFieldHTML)) {
			u.f.fixFieldHTML(field);
		}
		field._custom_initialized = false;
		var custom_init;
		for(custom_init in this.customInit) {
			if(u.hc(field, custom_init)) {
				this.customInit[custom_init](field);
				field._custom_initialized = true;
				break;
			}
		}
		if(!field._custom_initialized) {
			if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
				field.type = field.className.match(/(?:^|\b)(string|email|tel|number|integer|password|date|datetime)(?:\b|$)/)[0];
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "text")) {
				field.type = "text";
				field.input = u.qs("textarea", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value;
				if(u.hc(field, "autoexpand")) {
					u.ass(field.input, {
						"overflow": "hidden"
					});
					field.input.setHeight = function() {
						u.ass(this, {
							height: "auto"
						});
						u.ass(this, {
							height: (this.scrollHeight) + "px"
						});
					}
					u.e.addEvent(field.input, "input", field.input.setHeight);
					field.input.setHeight();
				}
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "select")) {
				field.type = "select";
				field.input = u.qs("select", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_select;
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "keyup", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "checkbox|boolean")) {
				field.type = field.className.match(/(?:^|\b)(checkbox|boolean)(?:\b|$)/)[0];
				field.input = u.qs("input[type=checkbox]", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_checkbox;
				u.f._update_checkbox_field.bind(field.input)();
				u.e.addEvent(field.input, "change", this._changed);
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._update_checkbox_field);
				this.inputOnEnter(field.input);
				this.activateInput(field.input);
			}
			else if(u.hc(field, "radiobuttons")) {
				field.type = "radiobuttons";
				field.inputs = u.qsa("input", field);
				field.input = field.inputs[0];
				for(j = 0; j < field.inputs.length; j++) {
					input = field.inputs[j];
					input._form = _form;
					input.label = u.qs("label[for='"+input.id+"']", field);
					input.field = field;
					input.val = this._value_radiobutton;
					u.e.addEvent(input, "change", this._changed);
					u.e.addEvent(input, "change", this._updated);
					this.inputOnEnter(input);
					this.activateInput(input);
				}
			}
			else if(u.hc(field, "files")) {
				field.type = "files";
				field.input = u.qs("input", field);
				field.input._form = _form;
				field.input.label = u.qs("label[for='"+field.input.id+"']", field);
				field.input.field = field;
				field.input.val = this._value_file;
				field.filelist = u.qs("ul.filelist", field);
				if(!field.filelist) {
					field.filelist = u.ae(field, "ul", {"class":"filelist"});
					field.insertBefore(field.help, field.filelist);
				}
				field.filelist.field = field;
				field.uploaded_files = u.qsa("li.uploaded", field.filelist);
				this._update_filelist.bind(field.input)();
				u.e.addEvent(field.input, "change", this._updated);
				u.e.addEvent(field.input, "change", this._changed);
				if(u.e.event_support != "touch") {
					u.e.addEvent(field.input, "dragenter", this._focus);
					u.e.addEvent(field.input, "dragleave", this._blur);
					u.e.addEvent(field.input, "drop", this._blur);
				}
				u.e.addEvent(field.input, "change", this._update_filelist);
				this.activateInput(field.input);
			}
			else {
				u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:", field);
			}
		}
		if(field.input) {
			_form.inputs[field.input.name] = field.input;
			if(!_form._bulk_operation) {
				this.validate(field.input);
			}
		}
	}
	this.initButton = function(_form, action) {
		action._form = _form;
		this.buttonOnEnter(action);
		this.activateButton(action);
	}
	this._reset = function(event, iN) {
		for (name in this.inputs) {
			if (this.inputs[name] && this.inputs[name].field && this.inputs[name].type != "hidden" && !this.inputs[name].getAttribute("readonly")) {
				this.inputs[name]._used = false;
				this.inputs[name].val("");
				if(fun(u.f.updateDefaultState)) {
					u.f.updateDefaultState(this.inputs[name]);
				}
			}
		}
		if(fun(this[this._callback_resat])) {
			this[this._callback_resat](iN);
		}
	}
	this._submit = function(event, iN) {
		var validate_inputs = [];
		for(name in this.inputs) {
			if(this.inputs[name] && this.inputs[name].field && fun(this.inputs[name].val)) {
				this.inputs[name]._used = true;
				validate_inputs.push(this.inputs[name]);
			}
		}
		u.f.bulkValidate(validate_inputs);
		if(!Object.keys(this._error_inputs).length) {
			if(fun(this[this._callback_pre_submitted])) {
				this[this._callback_pre_submitted](iN);
			}
			if(fun(this[this._callback_submitted])) {
				this[this._callback_submitted](iN);
			}
			else {
				for(name in this.inputs) {
					if(this.inputs[name] && this.inputs[name].default_value && this.inputs[name].nodeName.match(/^(input|textarea)$/i)) {
						if(fun(this.inputs[name].val) && !this.inputs[name].val()) {
							this.inputs[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; i < this.field.inputs.length; i++) {
				option = this.field.inputs[i];
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		for(i = 0; i < this.field.inputs.length; i++) {
			option = this.field.inputs[i];
			if(option.checked) {
				return option.value;
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
			}
			else {
				this.checked = false;
			}
			u.f._update_checkbox_field.bind(this)();
			u.f.validate(this);
		}
		if(this.checked) {
			return this.value;
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; i < this.options.length; i++) {
				option = this.options[i];
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return this.options[this.selectedIndex].value;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return "";
			}
		}
		return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			if(value === "") {
				this.value = null;
			}
			else {
				u.bug('ADDING VALUES MANUALLY TO INPUT type="file" IS NOT SUPPORTED IN JAVASCRIPT');
			}
			u.f._update_filelist.bind(this)();
			u.f.validate(this);
		}
		if(this.files && this.files.length) {
			var i, file, files = [];
			for(i = 0; i < this.files.length; i++) {
				file = this.files[i];
				files.push(file);
			}
			return files;
		}
		else if(!this.files && this.value) {
			return this.value;
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length){
			return true;
		}
		return "";
	}
	this._changed = function(event) {
		if(fun(this[this._form._callback_changed])) {
			this[this._form._callback_changed](this);
		}
		else if(fun(this.field.input[this._form._callback_changed])) {
			this.field.input[this._form._callback_changed](this);
		}
		if(fun(this._form[this._form._callback_changed])) {
			this._form[this._form._callback_changed](this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			u.f.validate(this);
			if(fun(this[this._form._callback_updated])) {
				this[this._form._callback_updated](this);
			}
			else if(fun(this.field.input[this._form._callback_updated])) {
				this.field.input[this._form._callback_updated](this);
			}
			if(fun(this._form[this._form._callback_updated])) {
				this._form[this._form._callback_updated](this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._update_filelist = function(event) {
		var i;
		var files = this.val();
		this.field.filelist.innerHTML = "";
		u.ae(this.field.filelist, "li", {html:this.field.hint ? u.text(this.field.hint) : u.text(this.label), class:"label"})
		if(files && files.length) {
			u.ac(this.field, "has_new_files");
			var i;
			for(i = 0; i < files.length; i++) {
				u.ae(this.field.filelist, "li", {html:files[i].name, class:"new"})
			}
			if(this.multiple) {
				for(i = 0; i < this.field.uploaded_files.length; i++) {
					u.ae(this.field.filelist, this.field.uploaded_files[i]);
				}
			}
		}
		else if(this.field.uploaded_files && this.field.uploaded_files.length) {
			u.rc(this.field, "has_new_files");
			var i;
			for(i = 0; i < this.field.uploaded_files.length; i++) {
				u.ae(this.field.filelist, this.field.uploaded_files[i]);
			}
		}
		else {
			u.rc(this.field, "has_new_files");
		}
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		else if(fun(this.field.input[this._form._callback_focused])) {
			this.field.input[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this._used = true;
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		else if(fun(this.field.input[this._form._callback_blurred])) {
			this.field.input[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(fun(this[this._form._callback_focused])) {
			this[this._form._callback_focused](this);
		}
		if(fun(this._form[this._form._callback_focused])) {
			this._form[this._form._callback_focused](this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(fun(this[this._form._callback_blurred])) {
			this[this._form._callback_blurred](this);
		}
		if(fun(this._form[this._form._callback_blurred])) {
			this._form[this._form._callback_blurred](this);
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && fun(this.clicked)) {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_support != "touch") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form._label_style && fun(this.customLabelStyle[iN._form._label_style])) {
			this.customLabelStyle[iN._form._label_style](iN);
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if(this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else if(this.url) {
						if(event && (event.metaKey || event.ctrlKey)) {
							window.open(this.url);
						}
						else {
							if(obj(u.h) && u.h.is_listening) {
								u.h.navigate(this.url, this);
							}
							else {
								location.href = this.url;
							}
						}
					}
				}
			}
		}
		var action_name = action.name ? action.name : (action.parentNode.className ? u.normalize(action.parentNode.className) : (action.value ? u.normalize(action.value) : u.normalize(u.text(action))));
		if(action_name && !action._form.actions[action_name]) {
			action._form.actions[action_name] = action;
		}
		if(obj(u.k) && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.positionHint = function(field) {
		if(field.help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field);
					return;
				}
			}
			var input_middle = field.input.offsetTop + (field.input.offsetHeight / 2);
			var help_top = input_middle - field.help.offsetHeight / 2;
			u.ass(field.help, {
				"top": help_top + "px"
			});
		}
	}
	this.updateFilelistStatus = function(form, response) {
		if(form && form.inputs && response && response.cms_status == "success" && response.cms_object && response.cms_object.mediae) {
			var mediae = JSON.parse(JSON.stringify(response.cms_object.mediae));
			var filelists = u.qsa("div.field.files ul.filelist", form);
			var i, j, k, filelist, old_files, old_file, new_files, new_files;
			for(i = 0; i < filelists.length; i++) {
				filelist = filelists[i];
				new_files = u.qsa("li.new", filelist);
				if(new_files.length) {
					old_files = u.qsa("li.uploaded", filelist);
					if(old_files.length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^" + filelist.field.input.name.replace(/\[\]$/, "") + "(\-|$)")) {
								for(k = 0; k < old_files.length; k++) {
									old_file = old_files[k];
									if(u.cv(old_file, "media_id") == media.id) {
										delete mediae[j];
									}
								}
							}
						}
					}
					if(Object.keys(mediae).length) {
						for(j in mediae) {
							media = mediae[j];
							if(media.variant.match("^"+filelist.field.input.name.replace(/\[\]$/, "")+"(\-|$)")) {
								for(k = 0; k < new_files.length; k++) {
									new_file = new_files[k];
									if(u.text(new_file) == media.name || u.text(new_file)+".zip" == media.name) {
										new_file.innerHTML = media.name;
										u.rc(new_file, "new");
										u.ac(new_file, "uploaded media_id:"+media.id+" variant:"+media.variant+" format:"+media.format+" width:"+media.width+" height:"+media.height);
										delete mediae[j];
									}
								}
							}
						}
					}
				}
				filelist.field.uploaded_files = u.qsa("li.uploaded", filelist);
			}
		}
	}
	this.inputHasError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		delete iN.is_correct;
		if(iN.val() !== "") {
			if(!iN.has_error && (iN._used || iN._form._bulk_operation)) {
				iN._form._error_inputs[iN.name] = true;
				u.ac(iN, "error");
				u.ac(iN.field, "error");
				iN.has_error = true;
				this.updateInputValidationState(iN);
			 }
		}
		else if(!iN.has_error && iN._used) {
			iN._form._error_inputs[iN.name] = true;
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			iN.has_error = true;
			this.updateInputValidationState(iN);
		}
		else if(!iN._used) {
			delete iN._form._error_inputs[iN.name];
			u.rc(iN, "error");
			u.rc(iN.field, "error");
			delete iN.has_error;
		}
		this.positionHint(iN.field);
	}
	this.inputIsCorrect = function(iN) {
		u.rc(iN, "error");
		u.rc(iN.field, "error");
		delete iN.has_error;
		delete iN._form._error_inputs[iN.name];
		if(iN.val() !== "") {
			if(!iN.is_correct) {
				iN._used = true;
				u.ac(iN, "correct");
				u.ac(iN.field, "correct");
				iN.is_correct = true;
				this.updateInputValidationState(iN);
			}
		}
		else if(iN.is_correct || iN.has_error) {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			delete iN.is_correct;
			this.updateInputValidationState(iN);
		}
	}
	this.updateInputValidationState = function(iN) {
		if(iN.has_error && fun(iN[iN._form._callback_validation_failed])) {
			iN[iN._form._callback_validation_failed]();
		}
		else if(iN.is_correct && fun(iN[iN._form._callback_validation_passed])) {
			iN[iN._form._callback_validation_passed]();
		}
		this.updateFormValidationState(iN._form);
	}
	this.updateFormValidationState = function(_form) {
		if(!_form._bulk_operation) {
			if(Object.keys(_form._error_inputs).length) {
				_form._validation_state = "error";
				if(_form._error_inputs !== _form._reference_error_inputs) {
					if(fun(_form[_form._callback_validation_failed])) {
						_form[_form._callback_validation_failed](_form._error_inputs);
					}
				}
			}
			else if(u.qsa(".field.required", _form).length === u.qsa(".field.required.correct", _form).length) {
				if(fun(_form[_form._callback_validation_passed]) && _form._validation_state !== "correct") {
					_form[_form._callback_validation_passed]();
				}
				_form._validation_state = "correct";
			}
			else {
				_form._validation_state = "void";
			}
			_form._reference_error_inputs = JSON.parse(JSON.stringify(_form._error_inputs));
		}
	}
	this.bulkValidate = function(inputs) {
		if(inputs && inputs.length) {
			var _form = inputs[0]._form;
			_form._bulk_operation = true;
			var i;
			for(i = 0; i < inputs.length; i++) {
				u.f.validate(inputs[i]);
			}
			_form._bulk_operation = false;
			this.updateFormValidationState(_form);
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation || !iN.field) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		var compare_to = iN.getAttribute("data-compare-to");
		if(!u.hc(iN.field, "required") && iN.val() === "" && (!compare_to || iN._form.inputs[compare_to].val() === "")) {
			this.inputIsCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.inputHasError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$")) &&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "email")) {
				pattern = iN.getAttribute("pattern");
				if(
					(
						(!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/))
						||
						(pattern && iN.val().match("^"+pattern+"$"))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				min = u.cv(iN.field, "min");
				max = u.cv(iN.field, "max");
				pattern = iN.getAttribute("pattern");
				if(
					(!min || new Date(decodeURIComponent(min)) <= new Date(iN.val())) &&
					(!max || new Date(decodeURIComponent(max)) >= new Date(iN.val())) &&
					(
						(!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/))
						||
						(pattern && iN.val().match(pattern))
					)
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("accept");
				var i, value = iN.val(), files = [];
				if(iN.field.uploaded_files && iN.field.uploaded_files.length) {
					for(i = 0; i < iN.field.uploaded_files.length; i++) {
						files.push("." + u.cv(iN.field.uploaded_files[i], "format").toLowerCase());
					}
				}
				if(value && value.length) {
					for(i = 0; i < value.length; i++) {
						files.push(value[i].name.substring(value[i].name.lastIndexOf(".")).toLowerCase());
					}
				}
				if(
					(files.length >= min && files.length <= max)
					&&
					(!pattern || files.every(function(v) {return pattern.split(",").indexOf(v) !== -1}))
				) {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.inputIsCorrect(iN);
				}
				else {
					this.inputHasError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
					&&
					(!compare_to || iN.val() == iN._form.inputs[compare_to].val())
				) {
					this.inputIsCorrect(iN);
					if(compare_to) {
						this.inputIsCorrect(iN._form.inputs[compare_to]);
					}
				}
				else {
					this.inputHasError(iN);
					if(compare_to) {
						this.inputHasError(iN._form.inputs[compare_to]);
					}
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
	this.getFormData = this.getParams = function(_form, _options) {
		var format = "formdata";
		var ignore_inputs = "ignoreinput";
		if(obj(_options)) {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
					case "format"           : format            = _options[_argument]; break;
				}
			}
		}
		var i, input, select, textarea, param, params;
		if(format == "formdata") {
			params = new FormData();
		}
		else {
			params = new Object();
			params.append = function(name, value, filename) {
				this[name] = filename || value;
			}
		}
		if(_form._submit_button && _form._submit_button.name) {
			params.append(_form._submit_button.name, _form._submit_button.value);
		}
		var inputs = u.qsa("input", _form);
		var selects = u.qsa("select", _form)
		var textareas = u.qsa("textarea", _form)
		for(i = 0; i < inputs.length; i++) {
			input = inputs[i];
			if(!u.hc(input, ignore_inputs)) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
				else if(input.type == "file") {
					var f, file, files;
					if(fun(input.val)) {
						files = input.val();
					}
					else if(input.files) {
						files = input.files;
					}
					if(files && files.length) {
						for(f = 0; f < files.length; f++) {
							file = files[f];
							params.append(input.name, file, file.name);
						}
					}
					else {
						params.append(input.name, (input.value || ""));
					}
				}
				else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
					if(fun(input.val)) {
						params.append(input.name, input.val());
					}
					else {
						params.append(input.name, input.value);
					}
				}
			}
		}
		for(i = 0; i < selects.length; i++) {
			select = selects[i];
			if(!u.hc(select, ignore_inputs)) {
				if(fun(select.val)) {
					params.append(select.name, select.val());
				}
				else {
					params.append(select.name, select.options[select.selectedIndex] ? select.options[select.selectedIndex].value : "");
				}
			}
		}
		for(i = 0; i < textareas.length; i++) {
			textarea = textareas[i];
			if(!u.hc(textarea, ignore_inputs)) {
				if(fun(textarea.val)) {
					params.append(textarea.name, textarea.val());
				}
				else {
					params.append(textarea.name, textarea.value);
				}
			}
		}
		if(format && fun(this.customDataFormat[format])) {
			return this.customDataFormat[format](params, _form);
		}
		else if(format == "formdata") {
			return params;
		}
		else if(format == "object") {
			delete params.append;
			return params;
		}
		else {
			var string = "";
			for(param in params) {
				if(!fun(params[param])) {
					string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
				}
			}
			return string;
		}
	}
}
Util.Form.customLabelStyle["inject"] = function(iN) {
	if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
		iN.default_value = u.text(iN.label);
		u.e.addEvent(iN, "focus", u.f._changed_state);
		u.e.addEvent(iN, "blur", u.f._changed_state);
		if(iN.type.match(/number|integer|password|datetime|date/)) {
			iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
			iN.pseudolabel.iN = iN;
			u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
			u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
			u.ce(iN.pseudolabel)
			iN.pseudolabel.inputStarted = function(event) {
				u.e.kill(event);
				this.iN.focus();
			}
		}
		u.f.updateDefaultState(iN);
	}
}
u.f._changed_state = function() {
	u.f.updateDefaultState(this);
}
u.f.updateDefaultState = function(iN) {
	if(iN.is_focused || iN.val() !== "") {
		u.rc(iN, "default");
		if(iN.val() === "") {
			iN.val("");
		}
	}
	else {
		if(iN.val() === "") {
			u.ac(iN, "default");
			iN.val(iN.default_value);
		}
	}
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, node, nodes, object;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; i < nodes.length; i++) {
		node = nodes[i];
		while((object = u.cv(node, "i"))) {
			u.rc(node, "i:"+object);
			if(object && obj(u.o[object])) {
				u.o[object].init(node);
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
u.objectValues = function(obj) {
	var key, values = [];
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}
	return values;
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_support == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 2;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; i < files.length; i++) {
			file = files[i];
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(fun(node[new_queue._callback_waiting])) {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(fun(next._queue._node[next._queue._callback_loading])) {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				if(next._file.match(/png|jpg|gif|svg/)) {
					next.loaded = function(event) {
						this.image = event.target;
						this._image = this.image;
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					u.loadImage(next, next._file);
				}
				else if(next._file.match(/mp3|aac|wav|ogg/)) {
					next.loaded = function(event) {
						console.log(event);
						this._queue.nodes[this.i] = this;
						u.rc(this, "loading");
						u.ac(this, "loaded");
						u._preloader_processes--;
						if(!u.qs("li.waiting,li.loading", this._queue)) {
							u.rc(this._queue._node, "loading");
							if(fun(this._queue._node[this._queue._callback_loaded])) {
								this._queue._node[this._queue._callback_loaded](this._queue.nodes);
							}
						}
						u._queueLoader();
					}
					if(fun(u.audioPlayer)) {
						next.audioPlayer = u.audioPlayer();
						next.load(next._file);
					}
					else {
						u.bug("You need u.audioPlayer to preload MP3s");
					}
				}
				else {
				}
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(fun(this.node.loaded)) {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(fun(this.node.loaded) && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(fun(this.node.failed)) {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(fun(this.node.progress)) {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].request_credentials = false;
	node[request_id].response_type = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	node[request_id].request_timeout = false;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method			= _options[argument]; break;
				case "params"				: node[request_id].request_data				= _options[argument]; break;
				case "data"					: node[request_id].request_data				= _options[argument]; break;
				case "async"				: node[request_id].request_async			= _options[argument]; break;
				case "headers"				: node[request_id].request_headers			= _options[argument]; break;
				case "credentials"			: node[request_id].request_credentials		= _options[argument]; break;
				case "responseType"			: node[request_id].response_type			= _options[argument]; break;
				case "callback"				: node[request_id].callback_response		= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error			= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback			= _options[argument]; break;
				case "timeout"				: node[request_id].request_timeout			= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(fun(node[request_id].HTTPRequest.addEventListener)) {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"])) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH/i)) {
				var params;
				if(obj(node[request_id].request_data) && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(node[request_id].response_type) {
					node[request_id].HTTPRequest.responseType = node[request_id].response_type;
				}
				if(node[request_id].request_timeout) {
					node[request_id].HTTPRequest.timeout = node[request_id].request_timeout;
				}
				if(node[request_id].request_credentials) {
					node[request_id].HTTPRequest.withCredentials = true;
				}
				if(!params.constructor.toString().match(/FormData/i) && (typeof(node[request_id].request_headers) != "object" || (!node[request_id].request_headers["Content-Type"] && !node[request_id].request_headers["content-type"]))) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				if(obj(node[request_id].request_headers)) {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		if(node[request_id].request_timeout) {
			node[request_id].timedOut = function(requestee) {
				this.status = 0;
				delete this.timedOut;
				delete this.t_timeout;
				Util.validateResponse({node: requestee.node, request_id: requestee.request_id, status:this.status});
			}
			node[request_id].t_timeout = u.t.setTimer(node[request_id], "timedOut", node[request_id].request_timeout, {node: node, request_id: request_id});
		}
		var key = u.randomString();
		document[key] = new Object();
		document[key].key = key;
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.t.resetTimer(this.node[this.request_id].t_timeout);
			delete this.node[this.request_id].timedOut;
			delete this.node[this.request_id].t_timeout;
			u.qs("head").removeChild(this.node[this.request_id].script_tag);
			delete this.node[this.request_id].script_tag;
			delete document[this.key];
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		node[request_id].script_tag = u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(obj(json)) {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(obj(responseText)) {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(HTTPRequest){
	var object = false;
	if(HTTPRequest) {
		var node = HTTPRequest.node;
		var request_id = HTTPRequest.request_id;
		var request = node[request_id];
		request.response_url = HTTPRequest.responseURL || request.request_url;
		delete request.HTTPRequest;
		if(request.finished) {
			return;
		}
		request.finished = true;
		try {
			request.status = HTTPRequest.status;
			if(HTTPRequest.status && !HTTPRequest.status.toString().match(/[45][\d]{2}/)) {
				if(HTTPRequest.responseType && HTTPRequest.response) {
					object = HTTPRequest.response;
				}
				else if(HTTPRequest.responseText) {
					object = u.evaluateResponseText(HTTPRequest.responseText);
				}
			}
			else if(HTTPRequest.responseText && typeof(HTTPRequest.status) == "undefined") {
				object = u.evaluateResponseText(HTTPRequest.responseText);
			}
		}
		catch(exception) {
			request.exception = exception;
		}
	}
	else {
		console.log("Lost track of this request. There is no way of routing it back to requestee.")
		return;
	}
	if(object !== false) {
		if(fun(request.callback_response)) {
			request.callback_response(object, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response](object, request_id);
		}
	}
	else {
		if(fun(request.callback_error)) {
			request.callback_error({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_error])) {
			node[request.callback_error]({error:true,status:request.status}, request_id);
		}
		else if(fun(request.callback_response)) {
			request.callback_response({error:true,status:request.status}, request_id);
		}
		else if(fun(node[request.callback_response])) {
			node[request.callback_response]({error:true,status:request.status}, request_id);
		}
	}
}
u.scrollTo = function(node, _options) {
	node._callback_scroll_to = "scrolledTo";
	node._callback_scroll_cancelled = "scrollToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	node._force_scroll_to = false;
	if(obj(_options)) {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node._callback_scroll_to            = _options[_argument]; break;
				case "callback_cancelled"   : node._callback_scroll_cancelled     = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"                 : to_node                            = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
				case "force"                : node._force_scroll_to              = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if (Util.support("scrollBehavior")) {
		var test = node.scrollTo({top:node._to_y, left:node._to_x, behavior: 'smooth'});
	}
	else {
		if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
			node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
		}
		if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
			node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
		}
		node._to_x = node._to_x < 0 ? 0 : node._to_x;
		node._to_y = node._to_y < 0 ? 0 : node._to_y;
		node._x_scroll_direction = node._to_x - u.scrollX();
		node._y_scroll_direction = node._to_y - u.scrollY();
		node._scroll_to_x = u.scrollX();
		node._scroll_to_y = u.scrollY();
		node._ignoreWheel = function(event) {
			u.e.kill(event);
		}
		if(node._force_scroll_to) {
			u.e.addEvent(node, "wheel", node._ignoreWheel);
		}
		node._scrollToHandler = function(event) {
			u.t.resetTimer(this.t_scroll);
			this.t_scroll = u.t.setTimer(this, this._scrollTo, 25);
		}
		node._cancelScrollTo = function() {
			if(!this._force_scroll_to) {
				u.t.resetTimer(this.t_scroll);
				this._scrollTo = null;
			}
		}
		node._scrollToFinished = function() {
			u.t.resetTimer(this.t_scroll);
			u.e.removeEvent(this, "wheel", this._ignoreWheel);
			this._scrollTo = null;
		}
		node._ZoomScrollFix = function(s_x, s_y) {
			if(Math.abs(this._scroll_to_y - s_y) <= 2 && Math.abs(this._scroll_to_x - s_x) <= 2) {
				return true;
			}
			return false;
		}
		node._scrollTo = function(start) {
			var s_x = u.scrollX();
			var s_y = u.scrollY();
			if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this._force_scroll_to || this._ZoomScrollFix(s_x, s_y)) {
				if(this._x_scroll_direction > 0 && this._to_x > s_x) {
					this._scroll_to_x = Math.ceil(this._scroll_to_x + (this._to_x - this._scroll_to_x)/6);
				}
				else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
					this._scroll_to_x = Math.floor(this._scroll_to_x - (this._scroll_to_x - this._to_x)/6);
				}
				else {
					this._scroll_to_x = this._to_x;
				}
				if(this._y_scroll_direction > 0 && this._to_y > s_y) {
					this._scroll_to_y = Math.ceil(this._scroll_to_y + (this._to_y - this._scroll_to_y)/6);
				}
				else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
					this._scroll_to_y = Math.floor(this._scroll_to_y - (this._scroll_to_y - this._to_y)/6);
				}
				else {
					this._scroll_to_y = this._to_y;
				}
				if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
					this._scrollToFinished();
					this.scrollTo(this._to_x, this._to_y);
					if(fun(this[this._callback_scroll_to])) {
						this[this._callback_scroll_to]();
					}
					return;
				}
				this.scrollTo(this._scroll_to_x, this._scroll_to_y);
				this._scrollToHandler();
			}
			else {
				this._cancelScrollTo();
				if(fun(this[this._callback_scroll_cancelled])) {
					this[this._callback_scroll_cancelled]();
				}
			}	
		}
		node._scrollTo();
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; i < matches.length; i++){
			match = matches[i];
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	string = string.toLowerCase();
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.pluralize = function(count, singular, plural) {
	if(count != 1) {
		return count + " " + plural;
	}
	return count + " " + singular;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(obj(test)) {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {
			console.log(exception)
		}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.svg = function(svg_object) {
	var svg, shape, svg_shape;
	if(svg_object.name && u._svg_cache && u._svg_cache[svg_object.name]) {
		svg = u._svg_cache[svg_object.name].cloneNode(true);
	}
	if(!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for(shape in svg_object.shapes) {
			Util.svgShape(svg, svg_object.shapes[shape]);
		}
		if(svg_object.name) {
			if(!u._svg_cache) {
				u._svg_cache = {};
			}
			u._svg_cache[svg_object.name] = svg.cloneNode(true);
		}
	}
	if(svg_object.title) {
		svg.setAttributeNS(null, "title", svg_object.title);
	}
	if(svg_object["class"]) {
		svg.setAttributeNS(null, "class", svg_object["class"]);
	}
	if(svg_object.width) {
		svg.setAttributeNS(null, "width", svg_object.width);
	}
	if(svg_object.height) {
		svg.setAttributeNS(null, "height", svg_object.height);
	}
	if(svg_object.id) {
		svg.setAttributeNS(null, "id", svg_object.id);
	}
	if(svg_object.node) {
		svg.node = svg_object.node;
	}
	if(svg_object.node) {
		svg_object.node.appendChild(svg);
	}
	return svg;
}
Util.svgShape = function(svg, svg_object) {
	svg_shape = document.createElementNS("http://www.w3.org/2000/svg", svg_object["type"]);
	svg_object["type"] = null;
	delete svg_object["type"];
	for(detail in svg_object) {
		svg_shape.setAttributeNS(null, detail, svg_object[detail]);
	}
	return svg.appendChild(svg_shape);
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		u.bug(navigator.userAgent);
		if(!window.chrome && navigator.userAgent.match(/WebKit[^$]+Version\/(\d+)(.\d)/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; i < scripts.length; i++) {
			script = scripts[i];
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && fun(window.getComputedStyle)) {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; i < styles.length; i++) {
					style = styles[i];
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(fun(timer._a)) {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(fun(node[timer._a])) {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		if(fun(this._timers[id]._a)) {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(fun(node[this._timers[id]._a])) {
			node[this._timers[id]._a](this._timers[id]._p);
		}
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.History = u.h = new function() {
	this.popstate = ("onpopstate" in window);
	this.callbacks = [];
	this.is_listening = false;
	this.navigate = function(url, node, silent) {
		silent = silent || false;
		if(this.popstate) {
			history.pushState({}, url, url);
			if(!silent) {
				this.callback(url);
			}
		}
		else {
			if(silent) {
				this.next_hash_is_silent = true;
			}
			location.hash = u.h.getCleanUrl(url);
		}
	}
	this.callback = function(url) {
		var i, recipient;
		for(i = 0; i < this.callbacks.length; i++) {
			recipient = this.callbacks[i];
			if(fun(recipient.node[recipient.callback])) {
				recipient.node[recipient.callback](url);
			}
		}
	}
	this.removeEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(recipient.node == node && recipient.callback == callback_urlchange) {
				this.callbacks.splice(i, 1);
				break;
			}
		}
	}
	this.addEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		if(!this.is_listening) {
			this.is_listening = true;
			if(this.popstate) {
				u.e.addEvent(window, "popstate", this._urlChanged);
			}
			else if("onhashchange" in window && !u.browser("explorer", "<=7")) {
				u.e.addEvent(window, "hashchange", this._hashChanged);
			}
			else {
				u.h._current_hash = window.location.hash;
				window.onhashchange = this._hashChanged;
				setInterval(
					function() {
						if(window.location.hash !== u.h._current_hash) {
							u.h._current_hash = window.location.hash;
							window.onhashchange();
						}
					}, 200
				);
			}
		}
		this.callbacks.push({"node":node, "callback":callback_urlchange});
	}
	this._urlChanged = function(event) {
		var url = u.h.getCleanUrl(location.href);
		if(event.state || (!event.state && event.path)) {
			u.h.callback(url);
		}
		else {
			history.replaceState({}, url, url);
		}
	}
	this._hashChanged = function(event) {
		if(!location.hash || !location.hash.match(/^#\//)) {
			location.hash = "#/"
			return;
		}
		var url = u.h.getCleanHash(location.hash);
		if(u.h.next_hash_is_silent) {
			delete u.h.next_hash_is_silent;
		}
		else {
			u.h.callback(url);
		}
	}
	this.trail = [];
	this.addToTrail = function(url, node) {
		this.trail.push({"url":url, "node":node});
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0];
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var path = string.split("/");
			levels = levels > path.length-1 ? path.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + path[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.resolveCurrentUrl = function() {
		return !location.hash ? this.getCleanUrl(location.href) : this.getCleanHash(location.hash);
	}
}
u.navigation = function(_options) {
	var navigation_node = page;
	var callback_navigate = "_navigate";
	var initialization_scope = page.cN;
	if(obj(_options)) {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "callback"       : callback_navigate           = _options[argument]; break;
				case "node"           : navigation_node             = _options[argument]; break;
				case "scope"          : initialization_scope        = _options[argument]; break;
			}
		}
	}
	window._man_nav_path = window._man_nav_path ? window._man_nav_path : u.h.getCleanUrl(location.href, 1);
	navigation_node._navigate = function(url) {
		var clean_url = u.h.getCleanUrl(url);
		u.stats.pageView(url);
		if(
			!window._man_nav_path || 
			(!u.h.popstate && window._man_nav_path != u.h.getCleanHash(location.hash, 1)) || 
			(u.h.popstate && window._man_nav_path != u.h.getCleanUrl(location.href, 1))
		) {
			if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && fun(this.cN.scene.navigate)) {
				this.cN.scene.navigate(clean_url, url);
			}
			else if(this.cN && fun(this.cN.navigate)) {
				this.cN.navigate(clean_url, url);
			}
		}
		if(!u.h.popstate) {
			window._man_nav_path = u.h.getCleanHash(location.hash, 1);
		}
		else {
			window._man_nav_path = u.h.getCleanUrl(location.href, 1);
		}
	}
	if(location.hash.length && location.hash.match(/^#!/)) {
		location.hash = location.hash.replace(/!/, "");
	}
	var callback_after_init = false;
	if(!this.is_initialized) {
		this.is_initialized = true;
		if(!u.h.popstate) {
			if(location.hash.length < 2) {
				window._man_nav_path = u.h.getCleanUrl(location.href);
				u.h.navigate(window._man_nav_path);
				u.init(initialization_scope);
			}
			else if(location.hash.match(/^#\//) && u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				callback_after_init = u.h.getCleanHash(location.hash);
			}
			else {
				u.init(initialization_scope);
			}
		}
		else {
			if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href) && location.hash.match(/^#\//)) {
				window._man_nav_path = u.h.getCleanHash(location.hash);
				u.h.navigate(window._man_nav_path);
				callback_after_init = window._man_nav_path;
			}
			else {
				u.init(initialization_scope);
			}
		}
		var random_string = u.randomString(8);
		if(callback_after_init) {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});u.h.callback("'+callback_after_init+'");}');
		}
		else {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});}');
		}
		u.t.setTimer(navigation_node, "_initNavigation_"+random_string, 100);
	}
	else {
		u.h.callbacks.push({"node":navigation_node, "callback":callback_navigate});
	}
}
u.txt = function(index) {
	if(!u.translations) {
	}
	if(index == "assign") {
		u.bug("USING RESERVED INDEX: assign");
		return "";
	}
	if(u.txt[index]) {
		return u.txt[index];
	}
	u.bug("MISSING TEXT: "+index);
	return "";
}
u.txt["assign"] = function(obj) {
	for(x in obj) {
		u.txt[x] = obj[x];
	}
}
if(document.documentMode && document.documentMode <= 10 && document.documentMode >= 8) {
	Util.appendElement = u.ae = function(_parent, node_type, attributes) {
		try {
			var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
			if(attributes) {
				var attribute;
				for(attribute in attributes) {
					if(!attribute.match(/^(value|html)$/)) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
			}
			node = _parent.appendChild(node);
			if(attributes) {
				if(attributes["value"]) {
					node.value = attributes["value"];
				}
				if(attributes["html"]) {
					node.innerHTML = attributes["html"];
				}
			}
			return node;
		}
		catch(exception) {
			u.exception("u.ae (desktop_ie10)", arguments, exception);
		}
	}
	Util.insertElement = u.ie = function(_parent, node_type, attributes) {
		try {
			var node = (obj(node_type)) ? node_type : (node_type == "svg" ? document.createElementNS("http://www.w3.org/2000/svg", node_type) : document.createElement(node_type));
			if(attributes) {
				var attribute;
				for(attribute in attributes) {
					if(!attribute.match(/^(value|html)$/)) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
			}
			node = _parent.insertBefore(node, _parent.firstChild);
			if(attributes) {
				if(attributes["value"]) {
					node.value = attributes["value"];
				}
				if(attributes["html"]) {
					node.innerHTML = attributes["html"];
				}
			}
			return node;
		}
		catch(exception) {
			u.exception("u.ie (desktop_ie10)", arguments, exception);
		}
	}
}
if(document.documentMode && document.documentMode <= 11 && document.documentMode >= 8) {
	Util.hasClass = u.hc = function(node, classname) {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
		if(node instanceof SVGElement) {
			if(regexp.test(node.className.baseVal)) {
				return true;
			}
		}
		else {
			if(regexp.test(node.className)) {
				return true;
			}
		}
		return false;
	}
	Util.addClass = u.ac = function(node, classname, dom_update) {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$)");
		if(node instanceof SVGElement) {
			if(!regexp.test(node.className.baseVal)) {
				node.className.baseVal += node.className.baseVal ? " " + classname : classname;
			}
		}
		else {
			if(!regexp.test(node.className)) {
				node.className += node.className ? " " + classname : classname;
			}
		}
		dom_update = (!dom_update) || (node.offsetTop);
		return node.className;
	}
	Util.removeClass = u.rc = function(node, classname, dom_update) {
		var regexp = new RegExp("(^|\\s)(" + classname + ")(?=[\\s]|$)", "g");
		if(node instanceof SVGElement) {
			node.className.baseVal = node.className.baseVal.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
		else {
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
		}
		dom_update = (!dom_update) || (node.offsetTop);
		return node.className;
	}
}
u.smartphoneSwitch = new function() {
	this.state = 0;
	this.init = function(node) {
		this.callback_node = node;
		this.event_id = u.e.addWindowEvent(this, "resize", this.resized);
		this.resized();
	}
	this.resized = function() {
		if(u.browserW() < 500 && !this.state) {
			this.switchOn();
		}
		else if(u.browserW() > 500 && this.state) {
			this.switchOff();
		}
	}
	this.switchOn = function() {
		if(!this.panel) {
			this.state = true;
			this.panel = u.ae(document.body, "div", {"id":"smartphone_switch"});
			u.ass(this.panel, {
				opacity: 0
			});
			u.ae(this.panel, "h1", {html:u.stringOr(u.txt["smartphone-switch-headline"], "Hello curious")});
			if(u.txt["smartphone-switch-text"].length) {
				for(i = 0; i < u.txt["smartphone-switch-text"].length; i++) {
					u.ae(this.panel, "p", {html:u.txt["smartphone-switch-text"][i]});
				}
			}
			var ul_actions = u.ae(this.panel, "ul", {class:"actions"});
			var li; 
			li = u.ae(ul_actions, "li", {class:"hide"});
			var bn_hide = u.ae(li, "a", {class:"hide button", html:u.txt["smartphone-switch-bn-hide"]});
			li = u.ae(ul_actions, "li", {class:"switch"});
			var bn_switch = u.ae(li, "a", {class:"switch button primary", html:u.txt["smartphone-switch-bn-switch"]});
			u.e.click(bn_switch);
			bn_switch.clicked = function() {
				u.saveCookie("smartphoneSwitch", "on");
				location.href = location.href.replace(/[&]segment\=desktop|segment\=desktop[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=smartphone";
			}
			u.e.click(bn_hide);
			bn_hide.clicked = function() {
				u.e.removeWindowEvent(u.smartphoneSwitch, "resize", u.smartphoneSwitch.event_id);
				u.smartphoneSwitch.switchOff();
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 1
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOn) == "function") {
				this.callback_node.smartphoneSwitchedOn();
			}
		}
	}
	this.switchOff = function() {
		if(this.panel) {
			this.state = false;
			this.panel.transitioned = function() {
				this.parentNode.removeChild(this);
				delete u.smartphoneSwitch.panel;
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 0
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOff) == "function") {
				this.callback_node.smartphoneSwitchedOff();
			}
		}
	}
}
u.showScene = function(scene) {
	var i, node;
	var nodes = u.cn(scene);
	if(nodes.length) {
		var article = u.qs("div.article", scene);
		if(nodes[0] == article) {
			var article_nodes = u.cn(article);
			nodes.shift();
			for(x in nodes) {
				article_nodes.push(nodes[x]);
			}
			nodes = article_nodes;
		}
		var headline = u.qs("h1,h2", scene);
		for(i = 0; node = nodes[i]; i++) {
			u.ass(node, {
				"opacity":0,
			});
		}
		u.ass(scene, {
			"opacity":1,
		});
		u._stepA1.call(headline);
		for(i = 0; node = nodes[i]; i++) {
			u.a.transition(node, "all 0.2s ease-in "+((i*100)+200)+"ms");
			u.ass(node, {
				"opacity":1,
				"transform":"translate(0, 0)"
			});
		}
	}
	else {
		u.ass(scene, {
			"opacity":1,
		});
	}
}
u._stepA1 = function() {
	this.innerHTML = this.innerHTML.replace(/[ ]?<br[ \/]?>[ ]?/, " <br /> ");
	this.innerHTML = '<span class="word">'+this.innerHTML.split(" ").join('</span> <span class="word">')+'</span>'; 
	var word_spans = u.qsa("span.word", this);
	var i, span;
	for(i = 0; span = word_spans[i]; i++) {
		if(span.innerHTML.match(/<br[ \/]?>/)) {
			span.parentNode.replaceChild(document.createElement("br"), span);
		}
		else {
			span.innerHTML = "<span>"+span.innerHTML.split("").join("</span><span>")+"</span>";
		}
	}
	this.spans = u.qsa("span:not(.word)", this);
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			span.innerHTML = span.innerHTML.replace(/ /, "&nbsp;");
			u.ass(span, {
				"transformOrigin": "0 100% 0",
				"transform":"translate(0, 40px)",
				"opacity":0
			});
		}
		u.ass(this, {
			"opacity":1
		});
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, 0)",
				"opacity":1
			});
			span.transitioned = function(event) {
				u.ass(this, {
					"transform":"none"
				});
			}
		}
	}
}
u._stepA2 = function() {
	if(this.spans) {
		var i, span;
		for(i = 0; span = this.spans[i]; i++) {
			u.a.transition(span, "all 0.2s ease-in-out "+(15*u.random(0, 15))+"ms");
			u.ass(span, {
				"transform":"translate(0, -40px)",
				"opacity":0
			});
		}
	}
}
u.txt["share"] = "Share this page";
u.txt["share-info-headline"] = "(How do I share?)";
u.txt["share-info-txt"] = "We have not included social media plugins on this site, because they are frequently abused to collect data about you. Also we don't want to promote some channels over others. Instead, just copy the link and share it wherever you find relevant.";
u.txt["share-info-ok"] = "OK";
u.txt["readmore"] = "Read more.";
u.txt["readstate-not_read"] = "Click to mark as read";
u.txt["readstate-read"] = "Read";
u.txt["add_comment"] = "Add comment";
u.txt["comment"] = "Comment";
u.txt["cancel"] = "Cancel";
u.txt["login_to_comment"] = '<a href="/login">Login</a> or <a href="/signup">Sign up</a> to add comments.';
u.txt["relogin"] = "Your session timed out - please login to continue.";
u.txt["terms-headline"] = "We love <br />cookies and privacy";
u.txt["terms-accept"] = "Accept";
u.txt["terms-details"] = "Details";
u.txt["smartphone-switch-headline"] = "Hello curious";
u.txt["smartphone-switch-text"] = [
	"If you are looking for a mobile version of this site, using an actual mobile phone is a better starting point.",
	"We care about our endusers and <em>one-size fits one device</em>, the parentNode way, provides an optimized user experience with a smaller footprint, because it doesn't come with all sizes included.",
	"But, since it is our mission to accommodate users, feel free to switch to the Smartphone segment and see if it serves your purpose better for the moment. We'll make sure to leave you with an option to return back to the Desktop segment.",
];
u.txt["smartphone-switch-bn-hide"] = "Hide";
u.txt["smartphone-switch-bn-switch"] = "Go to Smartphone version";
u.notifier = function(node) {
	u.bug_force = true;
	u.bug("enable notifier");
	var notifications = u.qs("div.notifications", node);
	if(!notifications) {
		node.notifications = u.ae(node, "div", {"id":"notifications"});
	}
	node.notifications.hide_delay = 4500;
	node.notifications.hide = function(node) {
		u.a.transition(this, "all 0.5s ease-in-out");
		u.a.translate(this, 0, -this.offsetHeight);
	}
	node.notify = function(response, _options) {
		var class_name = "message";
		if(obj(_options)) {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "class"	: class_name	= _options[argument]; break;
				}
			}
		}
		var output = [];
		if(obj(response) && response.isJSON) {
			var message = response.cms_message;
			var cms_status = typeof(response.cms_status) != "undefined" ? response.cms_status : "";
			if(obj(message)) {
				for(type in message) {
					if(str(message[type])) {
						output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":message[type]}));
					}
					else if(obj(message[type]) && message[type].length) {
						var node, i;
						for(i = 0; i < message[type].length; i++) {
							_message = message[type][i];
							output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status+" "+type, "html":_message}));
						}
					}
				}
			}
			else if(str(message)) {
				output.push(u.ae(this.notifications, "div", {"class":class_name+" "+cms_status, "html":message}));
			}
			if(fun(this.notifications.show)) {
				this.notifications.show();
			}
		}
		else if(obj(response) && response.isHTML) {
			var login = u.qs(".scene.login form", response);
			var messages = u.qsa(".scene div.messages p", response);
			if(login && !u.qs("#login_overlay")) {
				this.autosave_disabled = true;
				if(page.t_autosave) {
					u.t.resetTimer(page.t_autosave);
				}
				var overlay = u.ae(document.body, "div", {"id":"login_overlay"});
				overlay.node = this;
				u.ae(overlay, login);
				u.as(document.body, "overflow", "hidden");
				var relogin = u.ie(login, "h1", {"class":"relogin", "html":(u.txt["relogin"] ? u.txt["relogin"] : "Your session expired")});
				login.overlay = overlay;
				u.ae(login, "input", {"type":"hidden", "name":"ajaxlogin", "value":"true"})
				u.f.init(login);
				login.inputs["username"].focus();
				login.submitted = function() {
					this.response = function(response) {
						if(response.isJSON && response.cms_status == "success") {
							var csrf_token = response.cms_object["csrf-token"];
							var data_vars = u.qsa("[data-csrf-token]", page);
							var input_vars = u.qsa("[name=csrf-token]", page);
							var dom_vars = u.qsa("*", page);
							var i, node;
							for(i = 0; i < data_vars.length; i++) {
								node = data_vars[i];
								node.setAttribute("data-csrf-token", csrf_token);
							}
							for(i = 0; i < input_vars.length; i++) {
								node = input_vars[i];
								node.value = csrf_token;
							}
							for(i = 0; i < dom_vars.length; i++) {
								node = dom_vars[i];
								if(node.csrf_token) {
									node.csrf_token = csrf_token;
								}
							}
							this.overlay.parentNode.removeChild(this.overlay);
							var multiple_overlays = u.qsa("#login_overlay");
							if(multiple_overlays) {
								for(i = 0; i < multiple_overlays.length; i++) {
									overlay = multiple_overlays[i];
									overlay.parentNode.removeChild(overlay);
								}
							}
							u.as(document.body, "overflow", "auto");
							this.overlay.node.autosave_disabled = false;
							if(this.overlay.node._autosave_node && this.overlay.node._autosave_interval) {
								u.t.setTimer(this.overlay.node._autosave_node, "autosave", this.overlay.node._autosave_interval);
							}
						}
						else {
							this.inputs["username"].focus();
							this.inputs["password"].val("");
							var error_message = u.qs(".errormessage", response);
							if(error_message) {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":error_message.innerHTML});
							}
							else {
								this.overlay.node.notify({"isJSON":true, "cms_status":"error", "cms_message":"An error occured"});
							}
						}
					}
					u.request(this, this.action, {"method":this.method, "data":this.getData()});
				}
			}
			else if(messages) {
				for(i = 0; i < messages.length; i++) {
					message = messages[i];
					output.push(u.ae(this.notifications, "div", {"class":message.className, "html":message.innerHTML}));
				}
			}
		}
		this.t_notifier = u.t.setTimer(this.notifications, this.notifications.hide, this.notifications.hide_delay, output);
	}
}
u.smartphoneSwitch = new function() {
	this.state = 0;
	this.init = function(node) {
		this.callback_node = node;
		this.event_id = u.e.addWindowEvent(this, "resize", this.resized);
		this.resized();
	}
	this.resized = function() {
		if(u.browserW() < 520 && !this.state) {
			this.switchOn();
		}
		else if(u.browserW() > 520 && this.state) {
			this.switchOff();
		}
	}
	this.switchOn = function() {
		if(!this.panel) {
			this.state = true;
			this.panel = u.ae(document.body, "div", {"id":"smartphone_switch"});
			u.ass(this.panel, {
				opacity: 0
			});
			u.ae(this.panel, "h1", {html:u.stringOr(u.txt("smartphone-switch-headline"), "Hello curious")});
			if(u.txt("smartphone-switch-text").length) {
				for(i = 0; i < u.txt("smartphone-switch-text").length; i++) {
					u.ae(this.panel, "p", {html:u.txt("smartphone-switch-text")[i]});
				}
			}
			var ul_actions = u.ae(this.panel, "ul", {class:"actions"});
			var li; 
			li = u.ae(ul_actions, "li", {class:"hide"});
			var bn_hide = u.ae(li, "a", {class:"hide button", html:u.txt("smartphone-switch-bn-hide")});
			li = u.ae(ul_actions, "li", {class:"switch"});
			var bn_switch = u.ae(li, "a", {class:"switch button primary", html:u.txt("smartphone-switch-bn-switch")});
			u.e.click(bn_switch);
			bn_switch.clicked = function() {
				u.saveCookie("smartphoneSwitch", "on");
				location.href = location.href.replace(/[&]segment\=desktop|segment\=desktop[&]?/, "") + (location.href.match(/\?/) ? "&" : "?") + "segment=smartphone";
			}
			u.e.click(bn_hide);
			bn_hide.clicked = function() {
				u.e.removeWindowEvent(u.smartphoneSwitch, "resize", u.smartphoneSwitch.event_id);
				u.smartphoneSwitch.switchOff();
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 1
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOn) == "function") {
				this.callback_node.smartphoneSwitchedOn();
			}
		}
	}
	this.switchOff = function() {
		if(this.panel) {
			this.state = false;
			this.panel.transitioned = function() {
				this.parentNode.removeChild(this);
				delete u.smartphoneSwitch.panel;
			}
			u.a.transition(this.panel, "all 0.5s ease-in-out");
			u.ass(this.panel, {
				opacity: 0
			});
			if(this.callback_node && typeof(this.callback_node.smartphoneSwitchedOff) == "function") {
				this.callback_node.smartphoneSwitchedOff();
			}
		}
	}
}
u.bug_console_only = true;
Util.Objects["page"] = new function() {
	this.init = function(page) {
		window.page = page;
		u.bug_force = true;
		u.bug("This site is built using the combined powers of body, mind and spirit. Well, and also Manipulator, Janitor and Detector");
		u.bug("Visit https://parentnode.dk for more information");
		u.bug_force = false;
		page.style_tag = document.createElement("style");
		page.style_tag.setAttribute("media", "all");
		page.style_tag.setAttribute("type", "text/css");
		page.style_tag = u.ae(document.head, page.style_tag);
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);
		page.resized = function(event) {
			page.browser_h = u.browserH();
			page.browser_w = u.browserW();
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;
			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}
			if(page.browser_w > 1300) {
				u.ac(page, "fixed");
			}
			else {
				u.rc(page, "fixed");
			}
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized(event);
			}
			page.offsetHeight;
		}
		page.scrolled = function(event) {
			page.scrolled_y = u.scrollY();
			if(typeof(u.logoScroller) == "function") {
				u.logoScroller();
			}
			else {
				if(page.scrolled_y < page.logo.top_offset) {
					page.logo.is_reduced = false;
					var reduce_font = (1-(page.logo.top_offset-page.scrolled_y)/page.logo.top_offset) * page.logo.font_size_gap;
					page.logo.css_rule.style.setProperty("font-size", (page.logo.font_size-reduce_font)+"px", "important");
				}
				else if(!page.logo.is_reduced) {
					page.logo.is_reduced = true;
					page.logo.css_rule.style.setProperty("font-size", (page.logo.font_size-page.logo.font_size_gap)+"px", "important");
				}
			}
			if(page.nN.top_offset && page.scrolled_y < page.nN.top_offset) {
				page.nN.is_reduced = false;
				var factor = (1-(page.nN.top_offset-page.scrolled_y)/page.nN.top_offset);
				var reduce_font = factor * page.nN.font_size_gap;
				page.nN.list.css_rule.style.setProperty("font-size", (page.nN.font_size-reduce_font)+"px", "important");
				var reduce_top = factor * page.nN.top_offset_gap;
				page.nN.css_rule.style.setProperty("top", (page.nN.top_offset-reduce_top)+"px", "important");
			}
			else if(page.nN.top_offset && !page.nN.is_reduced) {
				page.nN.is_reduced = true;
				page.nN.list.css_rule.style.setProperty("font-size", (page.nN.font_size-page.nN.font_size_gap)+"px", "important");
				page.nN.css_rule.style.setProperty("top", (page.nN.top_offset-page.nN.top_offset_gap)+"px", "important");
			}
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled(event);
			}
		}
		page.ready = function() {
			if(!this.is_ready) {
				this.is_ready = true;
				u.e.addEvent(window, "resize", page.resized);
				u.e.addEvent(window, "scroll", page.scrolled);
				if(typeof(u.notifier) == "function") {
					u.notifier(this);
				}
				if(typeof(u.smartphoneSwitch) == "object") {
					u.smartphoneSwitch.init(this);
				}
				u.navigation();
				this.initHeader();
				this.initNavigation();
				this.initFooter();
				this.resized();
			}
		}
		page.cN.navigate = function(url, raw_url) {
			if(raw_url) {
				location.reload(true);
			}
			else {
				location.href = url;
			}
		}
		page.acceptCookies = function() {
			if(u.terms_version && !u.getCookie(u.terms_version)) {
				var terms_link = u.qs("li.terms a");
				if(terms_link && terms_link.href) {
					var terms = u.ie(document.body, "div", {"class":"terms_notification"});
					u.ae(terms, "h3", {"html":u.stringOr(u.txt["terms-headline"], "We love <br />cookies and privacy")});
					var bn_accept = u.ae(terms, "a", {"class":"accept", "html":u.stringOr(u.txt["terms-accept"], "Accept")});
					bn_accept.terms = terms;
					u.ce(bn_accept);
					bn_accept.clicked = function() {
						this.terms.parentNode.removeChild(this.terms);
						u.saveCookie(u.terms_version, true, {"path":"/", "expires":false});
					}
					if(!location.href.match(terms_link.href)) {
						var bn_details = u.ae(terms, "a", {"class":"details", "html":u.stringOr(u.txt["terms-details"], "Details"), "href":terms_link.href});
						u.ce(bn_details, {"type":"link"});
					}
					u.a.transition(terms, "all 0.5s ease-in");
					u.ass(terms, {
						"opacity": 1
					});
				}
			}
		}
		page.initHeader = function() {
			page.logo = u.ie(page.hN, "a", {"class":"logo", "html":u.eitherOr(u.site_name, "Frontpage")});
			page.logo.url = '/';
			page.logo.font_size = parseInt(u.gcs(page.logo, "font-size"));
			page.logo.font_size_gap = page.logo.font_size-14;
			page.logo.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
			page.style_tag.sheet.insertRule("#header a.logo {}", 0);
			page.logo.css_rule = page.style_tag.sheet.cssRules[0];
		}
		page.initNavigation = function() {
			var i, node, nodes;
			page.nN.list = u.qs("ul", page.nN);
			if(page.nN.list) {
				page.nN.list.nodes = u.qsa("li", page.nN.list);
				if(page.nN.list.nodes.length > 1) {
					page.nN.font_size = parseInt(u.gcs(page.nN.list.nodes[1], "font-size"));
					page.nN.font_size_gap = page.nN.font_size-14;
					page.nN.top_offset = u.absY(page.nN) + parseInt(u.gcs(page.nN, "padding-top"));
					page.nN.top_offset_gap = page.nN.top_offset-10;
					page.style_tag.sheet.insertRule("#navigation {}", 0);
					page.nN.css_rule = page.style_tag.sheet.cssRules[0];
					page.style_tag.sheet.insertRule("#navigation ul li {}", 0);
					page.nN.list.css_rule = page.style_tag.sheet.cssRules[0];
				}
			}
			nodes = u.qsa("#navigation li,a.logo", page.hN);
			for(i = 0; node = nodes[i]; i++) {
				u.ce(node, {"type":"link"});
				u.e.hover(node);
				node.over = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							this.transitioned = function() {
								u.a.transition(this, "none");
							}
							u.a.transition(this, "all 0.1s ease-in-out");
							u.a.scale(this, 1.2);
						}
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.15);
					}
					if(this._scale != 1.22) {
						u.a.transition(this, "all 0.1s ease-in-out");
						u.a.scale(this, 1.22);
					}
					else {
						this.transitioned();
					}
				}
				node.out = function() {
					u.a.transition(this, "none");
					this.transitioned = function() {
						this.transitioned = function() {
							u.a.transition(this, "none");
						}
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 1);
					}
					if(this._scale != 0.8) {
						u.a.transition(this, "all 0.1s ease-in");
						u.a.scale(this, 0.8);
					}
					else {
						this.transitioned();
					}
				}
			}
			if(page.hN.service) {
				var nav_anchor = u.qs("li.navigation", page.hN.service);
				if(nav_anchor) {
					page.hN.service.removeChild(nav_anchor);
				}
			}
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ie(page.hN.service, node);
				}
				page.fN.removeChild(page.fN.service);
			}
			if(u.github_fork) {
				var github = u.ae(page.hN.service, "li", {"html":'<a href="'+u.github_fork.url+'">'+u.github_fork.text+'</a>', "class":"github"});
				u.ce(github, {"type":"link"});
			}
		}
		page.initFooter = function() {
			u.a.transition(page.fN, "all 0.5s ease-in");
			u.ass(page.fN, {
				"opacity":1
			});
		}
		page.ready();
	}
}
u.e.addDOMReadyEvent(u.init);
Util.Objects["login"] = new function() {
	this.init = function(scene) {
		u.bug("scene init:", scene);
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this._form = u.qs("form", this);
			u.f.init(this._form);
			this._form.inputs["username"].focus();
			page.cN.scene = this;
			u.showScene(this);
			page.acceptCookies();
			page.resized();
		}
		scene.ready();
	}
}
Util.Objects["scene"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
			this.offsetHeight;
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			page.cN.scene = this;
			u.showScene(this);
			page.acceptCookies();
			page.resized();
		}
		scene.ready();
	}
}
Util.Objects["article"] = new function() {
	this.init = function(article) {
		u.bug("article init:", article);
		article.csrf_token = article.getAttribute("data-csrf-token");
		article.header = u.qs("h1,h2,h3", article);
		article.header.article = article;
		var i, image;
		article._images = u.qsa("div.image,div.media", article);
		for(i = 0; image = article._images[i]; i++) {
			image.node = article;
			image.caption = u.qs("p a", image);
			if(image.caption) {
				image.caption.removeAttribute("href");
			}
			image._id = u.cv(image, "item_id");
			image._format = u.cv(image, "format");
			image._variant = u.cv(image, "variant");
			if(image._id && image._format) {
				image._image_src = "/images/" + image._id + "/" + (image._variant ? image._variant+"/" : "") + "540x." + image._format;
				u.ass(image, {
					"opacity": 0
				});
				image.loaded = function(queue) {
					u.ac(this, "loaded");
					this._image = u.ie(this, "img");
					this._image.image = this;
					this._image.src = queue[0].image.src;
					if(this.node.article_list) {
						this.node.article_list.correctScroll(this.node, this, -10);
					}
					u.ce(this._image);
					this._image.clicked = function() {
						if(u.hc(this.image, "fullsize")) {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.rc(this.image, "fullsize");
							this.src = this.image._image_src;
						}
						else {
							u.a.transition(this, "all 0.3s ease-in-out");
							u.ac(this.image, "fullsize");
							if(this._fullsize_src) {
								this.src = this._fullsize_src;
							}
							else {
								this._fullsize_width = 1300;
								this._fullsize_src = "/images/" + this.image._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
								this.response = function() {
									this.src = this._fullsize_src;
								}
								this.responseError = function() {
									this._fullsize_width = this._fullsize_width-200;
									this._fullsize_src = "/images/" + this._id + "/" + (this.image._variant ? this.image._variant+"/" : "") + this._fullsize_width + "x." + this.image._format;
									u.request(this, this._fullsize_src);
								}
								u.request(this, this._fullsize_src);
							}
						}
					}
					u.a.transition(this, "all 0.5s ease-in-out");
					u.ass(this, {
						"opacity": 1
					});
				}
				u.preloader(image, [image._image_src]);
			}
		}
		article.geolocation = u.qs("ul.geo", article);
		if(article.geolocation && typeof(u.injectGeolocation) == "function") {
			u.injectGeolocation(article);
		}
		var hardlink = u.qs("li.main_entity.share", article);
		article.hardlink = hardlink ? (hardlink.hasAttribute("content") ? hardlink.getAttribute("content") : hardlink.innerHTML) : false;
		if(article.hardlink && typeof(u.injectSharing) == "function") {
			article.shareInjected = function() {
				if(this.article_list) {
					this.article_list.correctScroll(this, this.sharing);
				}
			}
			u.injectSharing(article);
		}
		article.header.current_readstate = article.getAttribute("data-readstate");
		article.add_readstate_url = article.getAttribute("data-readstate-add");
		article.delete_readstate_url = article.getAttribute("data-readstate-delete");
		if(article.header.current_readstate || (article.add_readstate_url && article.delete_readstate_url)) {
			u.addCheckmark(article.header);
			u.ce(article.header.checkmark);
			article.header.checkmark.clicked = function(event) {
				this.out(event);
				if(this.node.current_readstate) {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark not_read");
							this.node.current_readstate = false;
							this.node.article.setAttribute("data-readstate", "");
							this.hint_txt = u.txt["readstate-not_read"];
						}
					}
					u.request(this, this.node.article.delete_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token+"&item_id"});
				}
				else {
					this.response = function(response) {
						if(response.cms_status == "success" && response.cms_object) {
							this.setAttribute("class", "checkmark read");
							this.node.current_readstate = new Date();
							this.node.article.setAttribute("data-readstate", this.node.current_readstate);
							this.hint_txt = u.txt["readstate-read"] + ", " + u.date("Y-m-d H:i:s", this.node.current_readstate);
						}
					}
					u.request(this, this.node.article.add_readstate_url, {"method":"post", "params":"csrf-token="+this.node.article.csrf_token});
				}
			}
		}
	}
}
u.injectGeolocation = function(node) {
	if(!u.browser("IE", "<=9")) {
		node.geolocation.node = node;
		var li_longitude = u.qs("li.longitude", node.geolocation);
		var li_latitude = u.qs("li.latitude", node.geolocation);
		if(li_longitude && li_latitude) {
			node.geo_longitude = parseFloat(li_longitude.getAttribute("content"));
			node.geo_latitude = parseFloat(li_latitude.getAttribute("content"));
			node.showMap = function() {
				if(!this.geomap) {
					this.geomap = u.ae(this, "div", {"class":"geomap"});
					this.insertBefore(this.geomap, u.qs("ul.info", this));
					var maps_url = "https://maps.googleapis.com/maps/api/js" + (u.gapi_key ? "?key="+u.gapi_key : "");
					var html = '<html><head>';
					html += '<style type="text/css">body {margin: 0;}#map {height: 300px;}</style>';
					html += '<script type="text/javascript" src="'+maps_url+'"></script>';
					html += '<script type="text/javascript">';
					html += 'var map, marker;';
					html += 'var initialize = function() {';
					html += '	window._map_loaded = true;';
					html += '	var mapOptions = {center: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'),zoom: 12};';
					html += '	map = new google.maps.Map(document.getElementById("map"),mapOptions);';
					html += '	marker = new google.maps.Marker({position: new google.maps.LatLng('+this.geo_latitude+', '+this.geo_longitude+'), draggable:true});';
					html += '	marker.setMap(map);';
					html += '};';
					html += 'google.maps.event.addDomListener(window, "load", initialize);';
					html += '</script>';
					html += '</head><body><div id="map"></div></body></html>';
					this.mapsiframe = u.ae(this.geomap, "iframe");
					this.mapsiframe.doc = this.mapsiframe.contentDocument? this.mapsiframe.contentDocument: this.mapsiframe.contentWindow.document;
					this.mapsiframe.doc.open();
					this.mapsiframe.doc.write(html);
					this.mapsiframe.doc.close();
				}
			}
			node.geolocation.clicked = function() {
				this.node.showMap();
			}
			u.ce(node.geolocation);
			u.ac(node.geolocation, "active");
		}
	}
}


/*seg_desktop.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.2";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	u.bug("Invoked with arguments:");
	u.xInObject(_arguments);
	u.bug("Called from:");
	if(_arguments.callee.caller.name) {
		u.bug("arguments.callee.caller.name:" + _arguments.callee.caller.name)
	}
	else {
		u.bug("arguments.callee.caller:" + _arguments.callee.caller.toString().substring(0, 250));
	}
}
Util.bug = function(message, corner, color) {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			if(isNaN(corner)) {
				color = corner;
				corner = 0;
			}
			if(typeof(color) != "string") {
				color = "black";
			}
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "3px";
			}
			if(typeof(message) != "string") {
				message = message.toString();
			}
			var debug_div = document.getElementById("debug_id_"+corner);
			message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
			u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
		}
		if(typeof(console) == "object") {
			console.log(message);
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(typeof(_options) == "object") {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) != "string") {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && typeof(object[x]) == "function") {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
				else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(typeof(callback) == "function") {
								var key = u.randomString(4);
								node[key] = callback;
								node[key].callback(event);
								node[key] = null;
								callback = null;
							}
							else if(typeof(this[callback]) == "function") {
								this[callback](event);
								this[callback] = null;
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
		u.a.transition(event.target, "none");
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
			this.transitioned = null;
		}
	}
	this.removeTransform = function(node) {
		u.as(node, "transform", "none");
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		animation.node[animation.callback](1);
		if(typeof(animation.node.transitioned) == "function") {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
			}
		}
	}
	if(expires === false) {
		expires = ";expires=Mon, 04-Apr-2020 05:00:00 GMT";
	}
	else if(typeof(expires) === "string") {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(typeof(path) === "string") {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires;
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(typeof(path) === "string") {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/(^| )[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+(^| )/g, " ").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, i, regexp;
	var nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			nodes.push(node);
		}
	}
	return nodes.length ? nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; child = node.childNodes[i]; i++) {
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = _parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = _parent.insertBefore(node, _parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ie", arguments, exception);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(typeof(u.e) != "undefined" && typeof(u.e.click) == "function") {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(typeof(node.preClicked) == "function") {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey)) {
					window.open(this.url);
				}
				else {
					if(typeof(u.h) != "undefined" && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp(var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		if(node.className.match(regexp)) {
			return node.className.match(regexp)[0].replace(var_name + ":", "");
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname) {
	try {
		var old_class = node.className;
		node.className = classname;
		node.offsetTop;
		return old_class;
	}
	catch(exception) {
		u.exception("u.sc", arguments, exception);
	}
	return false;
}
Util.hasClass = u.hc = function(node, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	catch(exception) {
		u.exception("u.hc", arguments, exception);
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$)");
			if(!regexp.test(node.className)) {
				node.className += node.className ? " " + classname : classname;
				dom_update === false ? false : node.offsetTop;
			}
			return node.className;
		}
	}
	catch(exception) {
		u.exception("u.ac", arguments, exception);
	}
	return false;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(\\b)" + classname + "(\\s|$)", "g");
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
			dom_update === false ? false : node.offsetTop;
			return node.className;
		}
	}
	catch(exception) {
		u.exception("u.rc", arguments, exception);
	}
	return false;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(node.className)) {
			u.rc(node, classname, false);
			if(_classname) {
				u.ac(node, _classname, false);
			}
		}
		else {
			u.ac(node, classname, false);
			if(_classname) {
				u.rc(node, _classname, false);
			}
		}
		dom_update === false ? false : node.offsetTop;
		return node.className;
	}
	catch(exception) {
		u.exception("u.tc", arguments, exception);
	}
	return false;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update === false ? false : node.offsetTop;
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			node.style[u.vendorProperty(style)] = styles[style];
		}
	}
	dom_update === false ? false : node.offsetTop;
}
Util.getComputedStyle = u.gcs = function(node, property) {
	node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	if(window.getComputedStyle) {
		return window.getComputedStyle(node, null).getPropertyValue(property);
	}
	return false;
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
Util.insertAfter = u.ia = function(after_node, insert_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(next_node, insert_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; list_node = list[i]; i++) {
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
Util.nodeWithin = u.nw = function(node, scope) {
	var node_key = u.randomString(8);
	var scope_key = u.randomString(8);
	u.ac(node, node_key);
	u.ac(scope, scope_key);
	if(u.qs("."+scope_key+" ."+node_key)) {
		u.rc(node, node_key);
		u.rc(scope, scope_key);
		return true;
	}
	u.rc(node, node_key);
	u.rc(scope, scope_key);
	return false;
}
u.easings = new function() {
	this["ease-in"] = function(progress) {
		return Math.pow((progress*this.duration) / this.duration, 3);
	}
	this["linear"] = function(progress) {
		return progress;
	}
	this["ease-out"] = function(progress) {
		return 1 - Math.pow(1 - ((progress*this.duration) / this.duration), 3);
	}
	this["linear"] = function(progress) {
		return (progress*this.duration) / this.duration;
	}
	this["ease-in-out"] = function(progress) {
		if((progress*this.duration) > (this.duration / 2)) {
			return 1 - Math.pow(1 - ((progress*this.duration) / this.duration), 3);
		}
		return Math.pow((progress*this.duration) / this.duration, 3);
	}
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if(navigator.maxTouchPoints > 1) {
		if(typeof(document.ontouchmove) == "undefined" && typeof(document.onmousemove) == "undefined") {
			this.event_support = "multi";
		}
	}
	if(!this.event_support) {
		if(typeof(document.ontouchmove) == "undefined") {
			this.event_support = "mouse";
		}
		else {
			this.event_support = "touch";
		}
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(typeof(this.resetDragEvents) == "function") {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this._moves_cancel = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			if(event.type.match(/mouse/)) {
				var node = this;
				while(node) {
					if(node.e_drag || node.e_swipe) {
						u.e.addMoveEvent(this, u.e._cancelClick);
						break;
					}
					else {
						node = node.parentNode;
					}
				}
				u.e.addEvent(this, "mouseout", u.e._cancelClick);
			}
			else {
				u.e.addMoveEvent(this, u.e._cancelClick);
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || this._moves_cancel > 1 || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(typeof(this.clickCancelled) == "function") {
				this.clickCancelled(event);
			}
		}
		else if(event.type.match(/move/)) {
			this._moves_cancel++;
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = event;
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = event;
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = event;
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._callback_out = "out";
		node._callback_over = "over";
		if(typeof(_options) == "object") {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(typeof(this[this._callback_over]) == "function" && !this.is_hovered) {
			this[this._callback_over](event);
		}
		this.is_hovered = true;
	}
	this._out = function(event) {
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		if(typeof(this[this._callback_out]) == "function") {
			this[this._callback_out](event);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+' = '+action+'; window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {if(typeof(window["_OnWindowEvent_node_'+ id + '"]["'+action+'"]) == "function") {window["_OnWindowEvent_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, type, window["_OnWindowEvent_callback_" + id]);
	return id;
}
u.e.removeWindowEvent = function(node, type, id) {
	u.e.removeEvent(window, type, window["_OnWindowEvent_callback_"+id]);
	window["_OnWindowEvent_node_"+id] = null;
	window["_OnWindowEvent_callback_"+id] = null;
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_Onstart_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+' = '+action+'; window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {if(typeof(window["_Onstart_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onstart_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addStartEvent(window, window["_Onstart_callback_" + id]);
	return id;
}
u.e.removeWindowStartEvent = function(node, id) {
	u.e.removeStartEvent(window, window["_Onstart_callback_"+id]);
	window["_Onstart_node_"+id]["_Onstart_callback_"+id] = null;
	window["_Onstart_node_"+id] = null;
	window["_Onstart_callback_"+id] = null;
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_Onmove_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+' = '+action+'; window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {if(typeof(window["_Onmove_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onmove_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addMoveEvent(window, window["_Onmove_callback_" + id]);
	return id;
}
u.e.removeWindowMoveEvent = function(node, id) {
	u.e.removeMoveEvent(window, window["_Onmove_callback_" + id]);
	window["_Onmove_node_"+ id]["_Onmove_callback_"+id] = null;
	window["_Onmove_node_"+ id] = null;
	window["_Onmove_callback_"+ id] = null;
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_Onend_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onend_callback_' + id + '"] = function(event) {window["_Onend_node_'+ id + '"]._Onend_callback_'+id+' = '+action+'; window["_Onend_node_'+ id + '"]._Onend_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onend_callback_' + id + '"] = function(event) {if(typeof(window["_Onend_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onend_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEndEvent(window, window["_Onend_callback_" + id]);
	return id;
}
u.e.removeWindowEndEvent = function(node, id) {
	u.e.removeEndEvent(window, window["_Onend_callback_" + id]);
	window["_Onend_node_"+ id]["_Onend_callback_"+id] = null;
	window["_Onend_node_"+ id] = null;
	window["_Onend_callback_"+ id] = null;
}
u.e.addWindowResizeEvent = function(node, action) {
	var id = u.randomString();
	window["_Onresize_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onresize_callback_' + id + '"] = function(event) {window["_Onresize_node_'+ id + '"]._Onresize_callback_'+id+' = '+action+'; window["_Onresize_node_'+ id + '"]._Onresize_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onresize_callback_' + id + '"] = function(event) {if(typeof(window["_Onresize_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onresize_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, "resize", window["_Onresize_callback_" + id]);
	return id;
}
u.e.removeWindowResizeEvent = function(node, id) {
	u.e.removeEvent(window, "resize", window["_Onresize_callback_"+id]);
	window["_Onresize_node_"+id]["_Onresize_callback_"+id] = null;
	window["_Onresize_node_"+id] = null;
	window["_Onresize_callback_"+id] = null;
}
u.e.addWindowScrollEvent = function(node, action) {
	var id = u.randomString();
	window["_Onscroll_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onscroll_callback_' + id + '"] = function(event) {window["_Onscroll_node_'+ id + '"]._Onscroll_callback_'+id+' = '+action+'; window["_Onscroll_node_'+ id + '"]._Onscroll_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onscroll_callback_' + id + '"] = function(event) {if(typeof(window["_Onscroll_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onscroll_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, "scroll", window["_Onscroll_callback_" + id]);
	return id;
}
u.e.removeWindowScrollEvent = function(node, id) {
	u.e.removeEvent(window, "scroll", window["_Onscroll_callback_"+id]);
	window["_Onscroll_node_"+id]["_Onscroll_callback_"+id] = null;
	window["_Onscroll_node_"+id] = null;
	window["_Onscroll_callback_"+id] = null;
}
u.e.resetDragEvents = function(node) {
	node._moves_pick = 0;
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseout", this._drop_out);
	this.removeEvent(node, "mouseover", this._drop_over);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, _options) {
	node.e_drag_options = _options ? _options : {};
	node.e_drag = true;
	node._moves_counted = 0;
	node._moves_required = (u.system("android, winphone")) ? 2 : 0;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.drag_strict = true;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	node.callback_picked = "picked";
	node.callback_moved = "moved";
	node.callback_dropped = "dropped";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "strict"			: node.drag_strict			= _options[_argument]; break;
				case "elastica"			: node.drag_elastica		= Number(_options[_argument]); break;
				case "dropout"			: node.drag_dropout			= _options[_argument]; break;
				case "show_bounds"		: node.show_bounds			= _options[_argument]; break; 
				case "vertical_lock"	: node.vertical_lock		= _options[_argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= _options[_argument]; break;
				case "callback_picked"	: node.callback_picked		= _options[_argument]; break;
				case "callback_moved"	: node.callback_moved		= _options[_argument]; break;
				case "callback_dropped"	: node.callback_dropped		= _options[_argument]; break;
			}
		}
	}
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.start_drag_x = u.absX(boundaries) - u.absX(node);
		node.start_drag_y = u.absY(boundaries) - u.absY(node);
		node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
		node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: "+u.nodeId(node)+" in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
	node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
	node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	u.e.addStartEvent(node, this._inputStart);
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if(
		(init_speed_x > init_speed_y && this.only_horizontal) || 
		(init_speed_x < init_speed_y && this.only_vertical) ||
		(!this.only_vertical && !this.only_horizontal)) {
		if(this._moves_counted >= this._moves_required) {
			this._moves_counted = 0;
			u.e.resetNestedEvents(this);
			u.e.kill(event);
			if(u.hasFixedParent(this)) {
				this.has_fixed_parent = true;
			}
			else {
				this.has_fixed_parent = false;
			}
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this._x;
			this.move_last_y = this._y;
			if(u.hasFixedParent(this)) {
				this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
				this.start_input_y = u.eventY(event) - this._y - u.scrollY();
			}
			else {
				this.start_input_x = u.eventX(event) - this._x; 
				this.start_input_y = u.eventY(event) - this._y;
			}
			this.current_xps = 0;
			this.current_yps = 0;
			u.a.transition(this, "none");
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
			if(typeof(this[this.callback_picked]) == "function") {
				this[this.callback_picked](event);
			}
			if(this.drag_dropout && event.type.match(/mouse/)) {
				this._dropOutDrag = u.e._drag;
				this._dropOutDrop = u.e._drop;
				u.e.addOutEvent(this, u.e._drop_out);
			}
		}
		else {
			this._moves_counted++;
		}
	}
}
u.e._drag = function(event) {
	if(this.has_fixed_parent) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	u.bug("locked:" + this.locked);
	if(this.e_swipe) {
		if(this.only_horizontal) {
			if(this.current_xps < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.only_vertical) {
			if(this.current_yps < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
		else {
			if(Math.abs(this.current_xps) > Math.abs(this.current_yps)) {
				if(this.current_xps < 0) {
					this.swiped = "left";
				}
				else {
					this.swiped = "right";
				}
			}
			else if(Math.abs(this.current_xps) < Math.abs(this.current_yps)) {
				if(this.current_yps < 0) {
					this.swiped = "up";
				}
				else {
					this.swiped = "down";
				}
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(typeof(this[this.callback_moved]) == "function") {
		this[this.callback_moved](event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		this.e_swipe_options.eventAction = "Swiped "+ this.swiped;
		u.stats.event(this, this.e_swipe_options);
		if(this.swiped == "left" && typeof(this.swipedLeft) == "function") {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && typeof(this.swipedRight) == "function") {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && typeof(this.swipedDown) == "function") {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && typeof(this.swipedUp) == "function") {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = Math.round(this._x + (this.current_xps/2));
		this.current_y = Math.round(this._y + (this.current_yps/2));
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			this.transitioned = null;
			u.a.transition(this, "none");
			if(typeof(this.projected) == "function") {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "all 0.2s cubic-bezier(0,0,0.25,1)");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(this.e_drag && !this.e_swipe) {
		this.e_drag_options.eventAction = u.stringOr(this.e_drag_options.eventAction, "Dropped");
		u.stats.event(this, this.e_drag_options);
	}
	if(typeof(this[this.callback_dropped]) == "function") {
		this[this.callback_dropped](event);
	}
}
u.e._drop_out = function(event) {
	this._drop_out_id = u.randomString();
	document["_DroppedOutNode" + this._drop_out_id] = this;
	eval('document["_DroppedOutMove' + this._drop_out_id + '"] = function(event) {document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrag(event);}');
	eval('document["_DroppedOutOver' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);}');
	eval('document["_DroppedOutEnd' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrop(event);}');
	u.e.addEvent(document, "mousemove", document["_DroppedOutMove" + this._drop_out_id]);
	u.e.addEvent(this, "mouseover", document["_DroppedOutOver" + this._drop_out_id]);
	u.e.addEvent(document, "mouseup", document["_DroppedOutEnd" + this._drop_out_id]);
}
u.e.swipe = function(node, boundaries, _options) {
	node.e_swipe_options = _options ? _options : {};
	node.e_swipe = true;
	u.e.drag(node, boundaries, _options);
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customSend = {};
	this.customHintPosition = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_field;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._hover_z_index = 49;
		_form._validation = true;
		_form._debug_init = false;
		if(typeof(_options) == "object") {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"       : _form._validation      = _options[_argument]; break;
					case "focus_z"          : _form._focus_z_index   = _options[_argument]; break;
					case "debug"            : _form._debug_init      = _options[_argument]; break;
				}
			}
		}
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.fields = {};
		_form.actions = {};
		_form.error_fields = {};
		_form.labelstyle = u.cv(_form, "labelstyle");
		var fields = u.qsa(".field", _form);
		for(i = 0; field = fields[i]; i++) {
			field._base_z_index = u.gcs(field, "z-index");
			field._help = u.qs(".help", field);
			field._hint = u.qs(".hint", field);
			field._error = u.qs(".error", field);
			field._indicator = u.ae(field, "div", {"class":"indicator"});
			if(typeof(u.f.fixFieldHTML) == "function") {
				u.f.fixFieldHTML(field);
			}
			field._initialized = false;
			var custom_init;
			for(custom_init in this.customInit) {
				if(u.hc(field, custom_init)) {
					this.customInit[custom_init](_form, field);
					field._initialized = true;
				}
			}
			if(!field._initialized) {
				if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "text")) {
					field._input = u.qs("textarea", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					if(u.hc(field, "autoexpand")) {
						var current_height = parseInt(u.gcs(field._input, "height"));
						var current_value = field._input.val();
						field._input.value = "";
						u.as(field._input, "overflow", "hidden");
						field._input.autoexpand_offset = 0;
						if(parseInt(u.gcs(field._input, "height")) != field._input.scrollHeight) {
							field._input.autoexpand_offset = field._input.scrollHeight - parseInt(u.gcs(field._input, "height"));
						}
						field._input.value = current_value;
						field._input.setHeight = function() {
							var textarea_height = parseInt(u.gcs(this, "height"));
							if(this.val()) {
								if(u.browser("webkit") || u.browser("firefox", ">=29")) {
									if(this.scrollHeight - this.autoexpand_offset > textarea_height) {
										u.a.setHeight(this, this.scrollHeight);
									}
								}
								else if(u.browser("opera") || u.browser("explorer")) {
									if(this.scrollHeight > textarea_height) {
										u.a.setHeight(this, this.scrollHeight);
									}
								}
								else {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
						}
						u.e.addEvent(field._input, "keyup", field._input.setHeight);
						field._input.setHeight();
					}
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "select")) {
					field._input = u.qs("select", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value_select;
					u.e.addEvent(field._input, "change", this._updated);
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "checkbox|boolean")) {
					field._input = u.qs("input[type=checkbox]", field);
					field._input._form = _form;
					field._input.field = field;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					_form.fields[field._input.name] = field._input;
					field._input.val = this._value_checkbox;
					if(u.browser("explorer", "<=8")) {
						field._input.pre_state = field._input.checked;
						field._input._changed = this._changed;
						field._input._updated = this._updated;
						field._input._update_checkbox_field = this._update_checkbox_field;
						field._input._clicked = function(event) {
							if(this.checked != this.pre_state) {
								this._changed(window.event);
								this._updated(window.event);
								this._update_checkbox_field(window.event);
							}
							this.pre_state = this.checked;
						}
						u.e.addEvent(field._input, "click", field._input._clicked);
					}
					else {
						u.e.addEvent(field._input, "change", this._changed);
						u.e.addEvent(field._input, "change", this._updated);
						u.e.addEvent(field._input, "change", this._update_checkbox_field);
					}
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "radiobuttons")) {
					field._inputs = u.qsa("input", field);
					field._input = field._inputs[0];
					_form.fields[field._input.name] = field._input;
					for(j = 0; input = field._inputs[j]; j++) {
						input.field = field;
						input._form = _form;
						input._label = u.qs("label[for='"+input.id+"']", field);
						input.val = this._value_radiobutton;
						if(u.browser("explorer", "<=8")) {
							input.pre_state = input.checked;
							input._changed = this._changed;
							input._updated = this._updated;
							input._clicked = function(event) {
								var i, input;
								if(this.checked != this.pre_state) {
									this._changed(window.event);
									this._updated(window.event);
								}
								for(i = 0; input = this.field._input[i]; i++) {
									input.pre_state = input.checked;
								}
							}
							u.e.addEvent(input, "click", input._clicked);
						}
						else {
							u.e.addEvent(input, "change", this._changed);
							u.e.addEvent(input, "change", this._updated);
						}
						this.inputOnEnter(input);
						this.activateInput(input);
					}
					this.validate(field._input);
				}
				else if(u.hc(field, "files")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					u.e.addEvent(field._input, "change", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					u.e.addEvent(field._input, "focus", this._focus);
					u.e.addEvent(field._input, "blur", this._blur);
					if(u.e.event_pref == "mouse") {
						u.e.addEvent(field._input, "dragenter", this._focus);
						u.e.addEvent(field._input, "dragleave", this._blur);
						u.e.addEvent(field._input, "mouseenter", this._mouseenter);
						u.e.addEvent(field._input, "mouseleave", this._mouseleave);
					}
					u.e.addEvent(field._input, "blur", this._validate);
					field._input.val = this._value_file;
					this.validate(field._input);
				}
				else if(u.hc(field, "tags")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "prices")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else {
					u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:" + u.nodeId(field));
				}
			}
		}
		var hidden_fields = u.qsa("input[type=hidden]", _form);
		for(i = 0; hidden_field = hidden_fields[i]; i++) {
			if(!_form.fields[hidden_field.name]) {
				_form.fields[hidden_field.name] = hidden_field;
				hidden_field.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; action = actions[i]; i++) {
				action._form = _form;
			this.activateButton(action);
		}
		if(_form._debug_init) {
			u.bug(u.nodeId(_form) + ", fields:");
			u.xInObject(_form.fields);
			u.bug(u.nodeId(_form) + ", actions:");
			u.xInObject(_form.actions);
		}
	}
	this._reset = function (event, iN) {
		for (name in this.fields) {
			if (this.fields[name] && this.fields[name].field && this.fields[name].type != "hidden" && !this.fields[name].getAttribute("readonly")) {
				this.fields[name].used = false;
				this.fields[name].val("");
			}
		}
	}
	this._submit = function(event, iN) {
		for(name in this.fields) {
			if(this.fields[name] && this.fields[name].field && typeof(this.fields[name].val) == "function") {
				this.fields[name].used = true;
				u.f.validate(this.fields[name]);
			}
		}
		if(!Object.keys(this.error_fields).length) {
			if(typeof(this.submitted) == "function") {
				this.submitted(iN);
			}
			else {
				for(name in this.fields) {
					if(this.fields[name] && this.fields[name].default_value && typeof(this.fields[name].val) == "function" && !this.fields[name].val()) {
						if(this.fields[name].nodeName.match(/^(input|textarea)$/i)) {
							this.fields[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
				if(this.pseudolabel) {
					u.as(this.pseudolabel, "display", "none");
				}
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; option = this.field._inputs[i]; i++) {
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		else {
			for(i = 0; option = this.field._inputs[i]; i++) {
				if(option.checked) {
					return option.value;
				}
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
				u.ac(this.field, "checked");
			}
			else {
				this.checked = false;
				u.rc(this.field, "checked");
			}
			u.f.validate(this);
		}
		else {
			if(this.checked) {
				return this.value;
			}
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; option = this.options[i]; i++) {
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return i;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return -1;
			}
			return false;
		}
		else {
			return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
		}
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			this.value = value;
			if (value === "") {
				this.value = null;
			}
		}
		else {
			if(this.value && this.files && this.files.length) {
				var i, file, files = [];
				for(i = 0; file = this.files[i]; i++) {
					files.push(file);
				}
				return files;
			}
			else if(this.value) {
				return this.value;
			}
			else if(u.hc(this, "uploaded")){
				return true;
			}
			return "";
		}
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && typeof(this.clicked) == "function") {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this._changed = function(event) {
		this.used = true;
		if(typeof(this.changed) == "function") {
			this.changed(this);
		}
		else if(this.field._input && typeof(this.field._input.changed) == "function") {
			this.field._input.changed(this);
		}
		if(typeof(this.field.changed) == "function") {
			this.field.changed(this);
		}
		if(typeof(this._form.changed) == "function") {
			this._form.changed(this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			if(this.used || u.hc(this.field, "error")) {
				u.f.validate(this);
			}
			if(typeof(this.updated) == "function") {
				this.updated(this);
			}
			else if(this.field._input && typeof(this.field._input.updated) == "function") {
				this.field._input.updated(this);
			}
			if(typeof(this.field.updated) == "function") {
				this.field.updated(this);
			}
			if(typeof(this._form.updated) == "function") {
				this._form.updated(this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this.field._input._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		else if(this.field._input && typeof(this.field._input.focused) == "function") {
			this.field._input.focused(this);
		}
		if(typeof(this._form.focused) == "function") {
			this._form.focused(this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this.used = true;
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		else if(this.field._input && typeof(this.field._input.blurred) == "function") {
			this.field._input.blurred(this);
		}
		if(typeof(this._form.blurred) == "function") {
			this._form.blurred(this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		if(typeof(this._form.focused) == "function") {
			this._form.focused(this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		if(typeof(this._form.blurred) == "function") {
			this._form.blurred(this);
		}
	}
	this._changed_state = function() {
		u.f.updateDefaultState(this);
	}
	this.positionHint = function(field) {
		if(field._help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field._form, field);
					return;
				}
			}
			var input_middle, help_top;
 			if(u.hc(field, "html")) {
				input_middle = field._editor.offsetTop + (field._editor.offsetHeight / 2);
			}
			else {
				input_middle = field._input.offsetTop + (field._input.offsetHeight / 2);
			}
			help_top = input_middle - field._help.offsetHeight / 2;
			u.as(field._help, "top", help_top + "px");
		}
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_pref == "mouse") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form.labelstyle == "inject") {
			if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
				iN.default_value = u.text(iN._label);
				u.e.addEvent(iN, "focus", this._changed_state);
				u.e.addEvent(iN, "blur", this._changed_state);
				if(iN.type.match(/number|integer/)) {
					iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
					iN.pseudolabel.iN = iN;
					u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
					u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
					u.ce(iN.pseudolabel)
					iN.pseudolabel.inputStarted = function(event) {
						u.e.kill(event);
						this.iN.focus();
					}
				}
				u.f.updateDefaultState(iN);
			}
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event ? event : window.event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				u.e.kill(event);
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if (this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
		this.buttonOnEnter(action);
		var action_name = action.name ? action.name : action.parentNode.className;
		if(action_name) {
			action._form.actions[action_name] = action;
		}
		if(typeof(u.k) == "object" && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.updateDefaultState = function(iN) {
		if(iN.is_focused || iN.val() !== "") {
			u.rc(iN, "default");
			if(iN.val() === "") {
				iN.val("");
			}
			if(iN.pseudolabel) {
				u.as(iN.pseudolabel, "display", "none");
			}
		}
		else {
			if(iN.val() === "") {
				u.ac(iN, "default");
				if(iN.pseudolabel) {
					iN.val(iN.default_value);
					u.as(iN.pseudolabel, "display", "block");
				}
				else {
					iN.val(iN.default_value);
				}
			}
		}
	}
	this.fieldError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		if(iN.used || iN.val() !== "") {
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			this.positionHint(iN.field);
			iN._form.error_fields[iN.name] = true;
			this.updateFormValidationState(iN);
		}
	}
	this.fieldCorrect = function(iN) {
		if(iN.val() !== "") {
			u.ac(iN, "correct");
			u.ac(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		else {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		delete iN._form.error_fields[iN.name];
		this.updateFormValidationState(iN);
	}
	this.checkFormValidation = function(form) {
		if(Object.keys(form.error_fields).length) {
			return false;
		}
		var x, field;
		for(x in form.fields) {
			input = form.fields[x];
			if(input.field && u.hc(form.fields[x].field, "required") && !u.hc(form.fields[x].field, "correct")) {
				return false;
			}
		}
		return true;
	}
	this.updateFormValidationState = function(iN) {
		if(this.checkFormValidation(iN._form)) {
			if(typeof(iN.validationPassed) == "function") {
				iN.validationPassed();
			}
			if(typeof(iN.field.validationPassed) == "function") {
				iN.field.validationPassed();
			}
			if(typeof(iN._form.validationPassed) == "function") {
				iN._form.validationPassed();
			}
			return true;
		}
		else {
			if(typeof(iN.validationFailed) == "function") {
				iN.validationFailed(iN._form.error_fields);
			}
			if(typeof(iN.field.validationFailed) == "function") {
				iN.field.validationFailed(iN._form.error_fields);
			}
			if(typeof(iN._form.validationFailed) == "function") {
				iN._form.validationFailed(iN._form.error_fields);
			}
			return false;
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		if(!u.hc(iN.field, "required") && iN.val() === "") {
			this.fieldCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.fieldError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 20;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "email")) {
				if(
					!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/) ||
					(pattern && iN.val().match(pattern))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				if(
					u.hc(iN, "uploaded") ||
					(iN.val().length >= min && 
					iN.val().length <= max)
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tags")) {
				if(
					!pattern && iN.val().match(/\:/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "prices")) {
				if(
					!isNaN(iN.val())
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
}
u.f.getParams = function(_form, _options) {
	var send_as = "params";
	var ignore_inputs = "ignoreinput";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
				case "send_as"          : send_as           = _options[_argument]; break;
			}
		}
	}
	var i, input, select, textarea, param, params;
	if(send_as == "formdata" && (typeof(window.FormData) == "function" || typeof(window.FormData) == "object")) {
		params = new FormData();
	}
	else {
		if(send_as == "formdata") {
			send_as == "params";
		}
		params = new Object();
		params.append = function(name, value, filename) {
			this[name] = value;
		}
	}
	if(_form._submit_button && _form._submit_button.name) {
		params.append(_form._submit_button.name, _form._submit_button.value);
	}
	var inputs = u.qsa("input", _form);
	var selects = u.qsa("select", _form)
	var textareas = u.qsa("textarea", _form)
	for(i = 0; input = inputs[i]; i++) {
		if(!u.hc(input, ignore_inputs)) {
			if((input.type == "checkbox" || input.type == "radio") && input.checked) {
				if(typeof(input.val) == "function") {
					params.append(input.name, input.val());
				}
				else {
					params.append(input.name, input.value);
				}
			}
			else if(input.type == "file") {
				var f, file, files;
				if(typeof(input.val) == "function") {
					files = input.val();
				}
				else {
					files = input.value;
				}
				if(files) {
					for(f = 0; file = files[f]; f++) {
						params.append(input.name, file, file.name);
					}
				}
				else {
					params.append(input.name, "");
				}
			}
			else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
				if(typeof(input.val) == "function") {
					params.append(input.name, input.val());
				}
				else {
					params.append(input.name, input.value);
				}
			}
		}
	}
	for(i = 0; select = selects[i]; i++) {
		if(!u.hc(select, ignore_inputs)) {
			if(typeof(select.val) == "function") {
				params.append(select.name, select.val());
			}
			else {
				params.append(select.name, select.options[select.selectedIndex].value);
			}
		}
	}
	for(i = 0; textarea = textareas[i]; i++) {
		if(!u.hc(textarea, ignore_inputs)) {
			if(typeof(textarea.val) == "function") {
				params.append(textarea.name, textarea.val());
			}
			else {
				params.append(textarea.name, textarea.value);
			}
		}
	}
	if(send_as && typeof(this.customSend[send_as]) == "function") {
		return this.customSend[send_as](params, _form);
	}
	else if(send_as == "json") {
		return u.f.convertNamesToJsonObject(params);
	}
	else if(send_as == "formdata") {
		return params;
	}
	else if(send_as == "object") {
		delete params.append;
		return params;
	}
	else {
		var string = "";
		for(param in params) {
			if(typeof(params[param]) != "function") {
				string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
			}
		}
		return string;
	}
}
u.f.convertNamesToJsonObject = function(params) {
 	var indexes, root, indexes_exsists, param;
	var object = new Object();
	for(param in params) {
	 	indexes_exsists = param.match(/\[/);
		if(indexes_exsists) {
			root = param.split("[")[0];
			indexes = param.replace(root, "");
			if(typeof(object[root]) == "undefined") {
				object[root] = new Object();
			}
			object[root] = this.recurseName(object[root], indexes, params[param]);
		}
		else {
			object[param] = params[param];
		}
	}
	return object;
}
u.f.recurseName = function(object, indexes, value) {
	var index = indexes.match(/\[([a-zA-Z0-9\-\_]+)\]/);
	var current_index = index[1];
	indexes = indexes.replace(index[0], "");
 	if(indexes.match(/\[/)) {
		if(object.length !== undefined) {
			var i;
			var added = false;
			for(i = 0; i < object.length; i++) {
				for(exsiting_index in object[i]) {
					if(exsiting_index == current_index) {
						object[i][exsiting_index] = this.recurseName(object[i][exsiting_index], indexes, value);
						added = true;
					}
				}
			}
			if(!added) {
				temp = new Object();
				temp[current_index] = new Object();
				temp[current_index] = this.recurseName(temp[current_index], indexes, value);
				object.push(temp);
			}
		}
		else if(typeof(object[current_index]) != "undefined") {
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
		else {
			object[current_index] = new Object();
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
	}
	else {
		object[current_index] = value;
	}
	return object;
}
u.f.customBuild = {};
u.f.addForm = function(node, _options) {
	var form_name = "js_form";
	var form_action = "#";
	var form_method = "post";
	var form_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"			: form_name				= _options[_argument]; break;
				case "action"		: form_action			= _options[_argument]; break;
				case "method"		: form_method			= _options[_argument]; break;
				case "class"		: form_class			= _options[_argument]; break;
			}
		}
	}
	var form = u.ae(node, "form", {"class":form_class, "name": form_name, "action":form_action, "method":form_method});
	return form;
}
u.f.addFieldset = function(node, _options) {
	var fieldset_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "class"			: fieldset_class			= _options[_argument]; break;
			}
		}
	}
	return u.ae(node, "fieldset", {"class":fieldset_class});
}
u.f.addField = function(node, _options) {
	var field_name = "js_name";
	var field_label = "Label";
	var field_type = "string";
	var field_value = "";
	var field_options = [];
	var field_checked = false;
	var field_class = "";
	var field_id = "";
	var field_max = false;
	var field_min = false;
	var field_disabled = false;
	var field_readonly = false;
	var field_required = false;
	var field_pattern = false;
	var field_error_message = "There is an error in your input";
	var field_hint_message = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"					: field_name			= _options[_argument]; break;
				case "label"				: field_label			= _options[_argument]; break;
				case "type"					: field_type			= _options[_argument]; break;
				case "value"				: field_value			= _options[_argument]; break;
				case "options"				: field_options			= _options[_argument]; break;
				case "checked"				: field_checked			= _options[_argument]; break;
				case "class"				: field_class			= _options[_argument]; break;
				case "id"					: field_id				= _options[_argument]; break;
				case "max"					: field_max				= _options[_argument]; break;
				case "min"					: field_min				= _options[_argument]; break;
				case "disabled"				: field_disabled		= _options[_argument]; break;
				case "readonly"				: field_readonly		= _options[_argument]; break;
				case "required"				: field_required		= _options[_argument]; break;
				case "pattern"				: field_pattern			= _options[_argument]; break;
				case "error_message"		: field_error_message	= _options[_argument]; break;
				case "hint_message"			: field_hint_message	= _options[_argument]; break;
			}
		}
	}
	var custom_build;
	if(field_type in u.f.customBuild) {
		return u.f.customBuild[field_type](node, _options);
	}
	field_id = field_id ? field_id : "input_"+field_type+"_"+field_name;
	field_disabled = !field_disabled ? (field_class.match(/(^| )disabled( |$)/) ? "disabled" : false) : "disabled";
	field_readonly = !field_readonly ? (field_class.match(/(^| )readonly( |$)/) ? "readonly" : false) : "readonly";
	field_required = !field_required ? (field_class.match(/(^| )required( |$)/) ? true : false) : true;
	field_class += field_disabled ? (!field_class.match(/(^| )disabled( |$)/) ? " disabled" : "") : "";
	field_class += field_readonly ? (!field_class.match(/(^| )readonly( |$)/) ? " readonly" : "") : "";
	field_class += field_required ? (!field_class.match(/(^| )required( |$)/) ? " required" : "") : "";
	field_class += field_min ? (!field_class.match(/(^| )min:[0-9]+( |$)/) ? " min:"+field_min : "") : "";
	field_class += field_max ? (!field_class.match(/(^| )max:[0-9]+( |$)/) ? " max:"+field_max : "") : "";
	if (field_type == "hidden") {
		return u.ae(node, "input", {"type":"hidden", "name":field_name, "value":field_value, "id":field_id});
	}
	var field = u.ae(node, "div", {"class":"field "+field_type+" "+field_class});
	var attributes = {};
	if(field_type == "string") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":"text", 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "email" || field_type == "tel" || field_type == "password") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "number" || field_type == "integer" || field_type == "date" || field_type == "datetime") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"max":field_max, 
			"min":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "checkbox") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value ? field_value : "true", 
			"name":field_name, 
			"disabled":field_disabled,
			"checked":field_checked
		};
		u.ae(field, "input", {"name":field_name, "value":"false", "type":"hidden"});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
		u.ae(field, "label", {"for":field_id, "html":field_label});
	}
	else if(field_type == "text") {
		attributes = {
			"id":field_id, 
			"html":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "textarea", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "select") {
		attributes = {
			"id":field_id, 
			"name":field_name, 
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		var select = u.ae(field, "select", u.f.verifyAttributes(attributes));
		if(field_options) {
			var i, option;
			for(i = 0; option = field_options[i]; i++) {
				if(option.value == field_value) {
					u.ae(select, "option", {"value":option.value, "html":option.text, "selected":"selected"});
				}
				else {
					u.ae(select, "option", {"value":option.value, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "radiobuttons") {
		u.ae(field, "label", {"html":field_label});
		if(field_options) {
			var i, option;
			for(i = 0; option = field_options[i]; i++) {
				var div = u.ae(field, "div", {"class":"item"});
				if(option.value == field_value) {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name, "checked":"checked"});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
				else {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "files") {
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", {"id":field_id, "name":field_name, "type":"file"});
	}
	else {
		u.bug("input type not implemented")
	}
	if(field_hint_message || field_error_message) {
		var help = u.ae(field, "div", {"class":"help"});
		if (field_hint_message) {
			u.ae(help, "div", { "class": "hint", "html": field_hint_message });
		}
		if(field_error_message) {
			u.ae(help, "div", { "class": "error", "html": field_error_message });
		}
	}
	return field;
}
u.f.verifyAttributes = function(attributes) {
	for(attribute in attributes) {
		if(attributes[attribute] === undefined || attributes[attribute] === false || attributes[attribute] === null) {
			delete attributes[attribute];
		}
	}
	return attributes;
}
u.f.addAction = function(node, _options) {
	var action_type = "submit";
	var action_name = "js_name";
	var action_value = "";
	var action_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "type"			: action_type			= _options[_argument]; break;
				case "name"			: action_name			= _options[_argument]; break;
				case "value"		: action_value			= _options[_argument]; break;
				case "class"		: action_class			= _options[_argument]; break;
			}
		}
	}
	var p_ul = node.nodeName.toLowerCase() == "ul" ? node : u.pn(node, {"include":"ul"});
	if(!p_ul || !u.hc(p_ul, "actions")) {
		if(node.nodeName.toLowerCase() == "form") {
			p_ul = u.qs("ul.actions", node);
		}
		p_ul = p_ul ? p_ul : u.ae(node, "ul", {"class":"actions"});
	}
	var p_li = node.nodeName.toLowerCase() == "li" ? node : u.pn(node, {"include":"li"});
	if(!p_li || p_ul != p_li.parentNode) {
		p_li = u.ae(p_ul, "li", {"class":action_name});
	}
	else {
		p_li = node;
	}
	var action = u.ae(p_li, "input", {"type":action_type, "class":action_class, "value":action_value, "name":action_name})
	return action;
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.History = u.h = new function() {
	this.popstate = ("onpopstate" in window);
	this.callbacks = [];
	this.is_listening = false;
	this.navigate = function(url, node) {
		if(this.popstate) {
			history.pushState({}, url, url);
			this.callback(url);
		}
		else {
			location.hash = u.h.getCleanUrl(url);
		}
	}
	this.callback = function(url) {
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(typeof(recipient.node[recipient.callback]) == "function") {
				recipient.node[recipient.callback](url);
			}
		}
	}
	this.removeEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(typeof(_options) == "object") {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		var i, recipient;
		for(i = 0; recipient = this.callbacks[i]; i++) {
			if(recipient.node == node && recipient.callback == callback_urlchange) {
				this.callbacks.splice(i, 1);
				break;
			}
		}
	}
	this.addEvent = function(node, _options) {
		var callback_urlchange = "navigate";
		if(typeof(_options) == "object") {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: callback_urlchange		= _options[argument]; break;
				}
			}
		}
		if(!this.is_listening) {
			this.is_listening = true;
			if(this.popstate) {
				u.e.addEvent(window, "popstate", this._urlChanged);
			}
			else if("onhashchange" in window && !u.browser("explorer", "<=7")) {
				u.e.addEvent(window, "hashchange", this._hashChanged);
			}
			else {
				u.h._current_hash = window.location.hash;
				window.onhashchange = this._hashChanged;
				setInterval(
					function() {
						if(window.location.hash !== u.h._current_hash) {
							u.h._current_hash = window.location.hash;
							window.onhashchange();
						}
					}, 200
				);
			}
		}
		this.callbacks.push({"node":node, "callback":callback_urlchange});
	}
	this._urlChanged = function(event) {
		var url = u.h.getCleanUrl(location.href);
		if(event.state || (!event.state && event.path)) {
			u.h.callback(url);
		}
		else {
			history.replaceState({}, url, url);
		}
	}
	this._hashChanged = function(event) {
		if(!location.hash || !location.hash.match(/^#\//)) {
			location.hash = "#/"
			return;
		}
		var url = u.h.getCleanHash(location.hash);
		u.h.callback(url);
	}
	this.trail = [];
	this.addToTrail = function(url, node) {
		this.trail.push({"url":url, "node":node});
	}
	this.getCleanUrl = function(string, levels) {
		string = string.replace(location.protocol+"//"+document.domain, "").match(/[^#$]+/)[0];
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var path = string.split("/");
			levels = levels > path.length-1 ? path.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + path[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.resolveCurrentUrl = function() {
		return !location.hash ? this.getCleanUrl(location.href) : this.getCleanHash(location.hash);
	}
}
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, node, nodes, object;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; node = nodes[i]; i++) {
		while((object = u.cv(node, "i"))) {
			u.rc(node, "i:"+object);
			if(object && typeof(u.o[object]) == "object") {
				u.o[object].init(node);
			}
		}
	}
}
Util.Keyboard = u.k = new function() {
	this.shortcuts = {};
	this.onkeydownCatcher = function(event) {
		u.k.catchKey(event);
	}
	this.addKey = function(node, key, _options) {
		node.callback_keyboard = "clicked";
		node.metakey_required = true;
		if(typeof(_options) == "object") {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "callback"		: node.callback_keyboard	= _options[argument]; break;
					case "metakey"		: node.metakey_required		= _options[argument]; break;
				}
			}
		}
		if(!this.shortcuts.length) {
			u.e.addEvent(document, "keydown", this.onkeydownCatcher);
		}
		if(!this.shortcuts[key.toString().toUpperCase()]) {
			this.shortcuts[key.toString().toUpperCase()] = new Array();
		}
		this.shortcuts[key.toString().toUpperCase()].push(node);
	}
	this.catchKey = function(event) {
		event = event ? event : window.event;
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode == 27) {
			key = "ESC";
		}
		if(this.shortcuts[key]) {
			var nodes, node, i;
			nodes = this.shortcuts[key];
			for(i = 0; node = nodes[i]; i++) {
				if(u.nodeWithin(node, document.body)) {
					if(node.offsetHeight && ((event.ctrlKey || event.metaKey) || (!node.metakey_required || key == "ESC"))) {
						u.e.kill(event);
						if(typeof(node[node.callback_keyboard]) == "function") {
							node[node.callback_keyboard](event);
						}
					}
				}
				else {
					this.shortcuts[key].splice(i, 1);
					if(!this.shortcuts[key].length) {
						delete this.shortcuts[key];
						break;
					}
					else {
						i--;
					}
				}
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
u.navigation = function(_options) {
	var navigation_node = page;
	var callback_navigate = "_navigate";
	var initialization_scope = page.cN;
	if(typeof(_options) == "object") {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "callback"       : callback_navigate           = _options[argument]; break;
				case "node"           : navigation_node             = _options[argument]; break;
				case "scope"          : initialization_scope        = _options[argument]; break;
			}
		}
	}
	window._man_nav_path = window._man_nav_path ? window._man_nav_path : u.h.getCleanUrl(location.href, 1);
	navigation_node._navigate = function(url) {
		url = u.h.getCleanUrl(url);
		u.stats.pageView(url);
		if(
			!window._man_nav_path || 
			(!u.h.popstate && window._man_nav_path != u.h.getCleanHash(location.hash, 1)) || 
			(u.h.popstate && window._man_nav_path != u.h.getCleanUrl(location.href, 1))
		) {
			if(this.cN && typeof(this.cN.navigate) == "function") {
				this.cN.navigate(url);
			}
		}
		else {
			if(this.cN.scene && this.cN.scene.parentNode && typeof(this.cN.scene.navigate) == "function") {
				this.cN.scene.navigate(url);
			}
			else if(this.cN && typeof(this.cN.navigate) == "function") {
				this.cN.navigate(url);
			}
		}
		if(!u.h.popstate) {
			window._man_nav_path = u.h.getCleanHash(location.hash, 1);
		}
		else {
			window._man_nav_path = u.h.getCleanUrl(location.href, 1);
		}
	}
	if(location.hash.length && location.hash.match(/^#!/)) {
		location.hash = location.hash.replace(/!/, "");
	}
	var callback_after_init = false;
	if(!this.is_initialized) {
		this.is_initialized = true;
		if(!u.h.popstate) {
			if(location.hash.length < 2) {
				window._man_nav_path = u.h.getCleanUrl(location.href);
				u.h.navigate(window._man_nav_path);
				u.init(initialization_scope);
			}
			else if(location.hash.match(/^#\//) && u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				callback_after_init = u.h.getCleanHash(location.hash);
			}
			else {
				u.init(initialization_scope);
			}
		}
		else {
			if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href) && location.hash.match(/^#\//)) {
				window._man_nav_path = u.h.getCleanHash(location.hash);
				u.h.navigate(window._man_nav_path);
				callback_after_init = window._man_nav_path;
			}
			else {
				u.init(initialization_scope);
			}
		}
		var random_string = u.randomString(8);
		if(callback_after_init) {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});u.h.callback("'+callback_after_init+'");}');
		}
		else {
			eval('navigation_node._initNavigation_'+random_string+' = function() {u.h.addEvent(this, {"callback":"'+callback_navigate+'"});}');
		}
		u.t.setTimer(navigation_node, "_initNavigation_"+random_string, 100);
	}
	else {
		u.h.callbacks.push({"node":navigation_node, "callback":callback_navigate});
	}
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_pref == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 4;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; file = files[i]; i++) {
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(typeof(node[new_queue._callback_waiting]) == "function") {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(typeof(next._queue._node[next._queue._callback_loading]) == "function") {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				next.loaded = function(event) {
					this.image = event.target;
					this._image = this.image;
					this._queue.nodes[this.i] = this;
					u.rc(this, "loading");
					u.ac(this, "loaded");
					u._preloader_processes--;
					if(!u.qs("li.waiting,li.loading", this._queue)) {
						u.rc(this._queue._node, "loading");
						if(typeof(this._queue._node[this._queue._callback_loaded]) == "function") {
							this._queue._node[this._queue._callback_loaded](this._queue.nodes);
						}
					}
					u._queueLoader();
				}
				u.loadImage(next, next._file);
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(typeof(this.node.loaded) == "function") {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(typeof(this.node.loaded) == "function" && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(typeof(this.node.failed) == "function") {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(typeof(this.node.progress) == "function") {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	if(typeof(_options) == "object") {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method		= _options[argument]; break;
				case "params"				: node[request_id].request_data			= _options[argument]; break;
				case "data"					: node[request_id].request_data			= _options[argument]; break;
				case "async"				: node[request_id].request_async		= _options[argument]; break;
				case "headers"				: node[request_id].request_headers		= _options[argument]; break;
				case "callback"				: node[request_id].callback_response	= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error		= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback		= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(typeof(node[request_id].HTTPRequest.addEventListener) == "function") {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node[request_id].HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node[request_id].request_headers) == "object") {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH/i)) {
				var params;
				if(typeof(node[request_id].request_data) == "object" && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(!params.constructor.toString().match(/FormData/i)) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node[request_id].HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node[request_id].request_headers) == "object") {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(typeof(json) == "object") {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object = false;
	if(response) {
		try {
			if(response.status && !response.status.toString().match(/403|404|500/)) {
				object = u.evaluateResponseText(response.responseText);
			}
			else if(response.responseText) {
				object = u.evaluateResponseText(response.responseText);
			}
		}
		catch(exception) {
			response.exception = exception;
		}
	}
	if(object) {
		if(typeof(response.node[response.request_id].callback_response) == "function") {
			response.node[response.request_id].callback_response(object, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_response]) == "function") {
			response.node[response.node[response.request_id].callback_response](object, response.request_id);
		}
	}
	else {
		if(typeof(response.node[response.request_id].callback_error) == "function") {
			response.node[response.request_id].callback_error(response, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_error]) == "function") {
			response.node[response.node[response.request_id].callback_error](response, response.request_id);
		}
		else if(typeof(response.node[response.request_id].callback_response) == "function") {
			response.node[response.request_id].callback_response(response, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_response]) == "function") {
			response.node[response.node[response.request_id].callback_response](response, response.request_id);
		}
	}
}
u.scrollTo = function(node, _options) {
	node.callback_scroll_to = "scrolledTo";
	node.callback_scroll_cancelled = "scrolledToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node.callback_scroll_to           = _options[_argument]; break;
				case "callback_cancelled"   : node.callback_scroll_cancelled    = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"              : to_node                               = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
		node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
	}
	if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
		node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
	}
	node._to_x = node._to_x < 0 ? 0 : node._to_x;
	node._to_y = node._to_y < 0 ? 0 : node._to_y;
	node._x_scroll_direction = node._to_x - u.scrollX();
	node._y_scroll_direction = node._to_y - u.scrollY();
	node._scroll_to_x = u.scrollX();
	node._scroll_to_y = u.scrollY();
	node.scrollToHandler = function(event) {
		u.t.resetTimer(this.t_scroll);
		this.t_scroll = u.t.setTimer(this, this._scrollTo, 50);
	}
	u.e.addEvent(node, "scroll", node.scrollToHandler);
	node.cancelScrollTo = function() {
		u.t.resetTimer(this.t_scroll);
		u.e.removeEvent(this, "scroll", this.scrollToHandler);
		this._scrollTo = null;
	}
	node.IEScrollFix = function(s_x, s_y) {
		if(!u.browser("ie")) {
			return false;
		}
		else if((s_y == this._scroll_to_y && (s_x == this._scroll_to_x+1 || s_x == this._scroll_to_x-1)) ||	(s_x == this._scroll_to_x && (s_y == this._scroll_to_y+1 || s_y == this._scroll_to_y-1))) {
			return true;
		}
	}
	node._scrollTo = function(start) {
		var s_x = u.scrollX();
		var s_y = u.scrollY();
		if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this.IEScrollFix(s_x, s_y)) {
			if(this._x_scroll_direction > 0 && this._to_x > s_x) {
				this._scroll_to_x = Math.ceil(s_x + (this._to_x - s_x)/4);
			}
			else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
				this._scroll_to_x = Math.floor(s_x - (s_x - this._to_x)/4);
			}
			else {
				this._scroll_to_x = this._to_x;
			}
			if(this._y_scroll_direction > 0 && this._to_y > s_y) {
				this._scroll_to_y = Math.ceil(s_y + (this._to_y - s_y)/4);
			}
			else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
				this._scroll_to_y = Math.floor(s_y - (s_y - this._to_y)/4);
			}
			else {
				this._scroll_to_y = this._to_y;
			}
			if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
				this.cancelScrollTo();
				this.scrollTo(this._to_x, this._to_y);
				if(typeof(this[this.callback_scroll_to]) == "function") {
					this[this.callback_scroll_to]();
				}
				return;
			}
			this.scrollTo(this._scroll_to_x, this._scroll_to_y);
		}
		else {
			this.cancelScrollTo();
			if(typeof(this[this.callback_scroll_cancelled]) == "function") {
				this[this.callback_scroll_cancelled]();
			}
		}	
	}
	node._scrollTo();
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	string = string.toLowerCase();
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.svg = function(svg_object) {
	var svg, shape, svg_shape;
	if(svg_object.name && u._svg_cache && u._svg_cache[svg_object.name]) {
		svg = u._svg_cache[svg_object.name].cloneNode(true);
	}
	if(!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for(shape in svg_object.shapes) {
			Util.svgShape(svg, svg_object.shapes[shape]);
		}
		if(svg_object.name) {
			if(!u._svg_cache) {
				u._svg_cache = {};
			}
			u._svg_cache[svg_object.name] = svg.cloneNode(true);
		}
	}
	if(svg_object.title) {
		svg.setAttributeNS(null, "title", svg_object.title);
	}
	if(svg_object["class"]) {
		svg.setAttributeNS(null, "class", svg_object["class"]);
	}
	if(svg_object.width) {
		svg.setAttributeNS(null, "width", svg_object.width);
	}
	if(svg_object.height) {
		svg.setAttributeNS(null, "height", svg_object.height);
	}
	if(svg_object.id) {
		svg.setAttributeNS(null, "id", svg_object.id);
	}
	if(svg_object.node) {
		svg.node = svg_object.node;
	}
	if(svg_object.node) {
		svg_object.node.appendChild(svg);
	}
	return svg;
}
Util.svgShape = function(svg, svg_object) {
	svg_shape = document.createElementNS("http://www.w3.org/2000/svg", svg_object["type"]);
	svg_object["type"] = null;
	delete svg_object["type"];
	for(detail in svg_object) {
		svg_shape.setAttributeNS(null, detail, svg_object[detail]);
	}
	return svg.appendChild(svg_shape);
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		if(!window.chrome && document.body.style.webkitTransform != undefined && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; script = scripts[i]; i++) {
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && typeof(window.getComputedStyle) == "function") {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; style = styles[i]; i++) {
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
u.textscaler = function(node, _settings) {
	if(typeof(_settings) != "object") {
		_settings = {
			"*":{
				"unit":"rem",
				"min_size":1,
				"min_width":200,
				"min_height":200,
				"max_size":40,
				"max_width":3000,
				"max_height":2000
			}
		};
	}
	node.text_key = u.randomString(8);
	u.ac(node, node.text_key);
	node.text_settings = JSON.parse(JSON.stringify(_settings));
	node.scaleText = function() {
		var tag;
		for(tag in this.text_settings) {
			var settings = this.text_settings[tag];
			var width_wins = false;
			var height_wins = false;
			if(settings.width_factor && settings.height_factor) {
				if(window._man_text._height - settings.min_height < window._man_text._width - settings.min_width) {
					height_wins = true;
				}
				else {
					width_wins = true;
				}
			}
			if(settings.width_factor && !height_wins) {
				if(settings.min_width <= window._man_text._width && settings.max_width >= window._man_text._width) {
					var font_size = settings.min_size + (settings.size_factor * (window._man_text._width - settings.min_width) / settings.width_factor);
					settings.css_rule.style.setProperty("font-size", font_size + settings.unit, "important");
				}
				else if(settings.max_width < window._man_text._width) {
					settings.css_rule.style.setProperty("font-size", settings.max_size + settings.unit, "important");
				}
				else if(settings.min_width > window._man_text._width) {
					settings.css_rule.style.setProperty("font-size", settings.min_size + settings.unit, "important");
				}
			}
			else if(settings.height_factor) {
				if(settings.min_height <= window._man_text._height && settings.max_height >= window._man_text._height) {
					var font_size = settings.min_size + (settings.size_factor * (window._man_text._height - settings.min_height) / settings.height_factor);
					settings.css_rule.style.setProperty("font-size", font_size + settings.unit, "important");
				}
				else if(settings.max_height < window._man_text._height) {
					settings.css_rule.style.setProperty("font-size", settings.max_size + settings.unit, "important");
				}
				else if(settings.min_height > window._man_text._height) {
					settings.css_rule.style.setProperty("font-size", settings.min_size + settings.unit, "important");
				}
			}
		}
	}
	node.cancelTextScaling = function() {
		u.e.removeEvent(window, "resize", window._man_text.scale);
	}
	if(!window._man_text) {
		var man_text = {};
		man_text.nodes = [];
		var style_tag = document.createElement("style");
		style_tag.setAttribute("media", "all")
		style_tag.setAttribute("type", "text/css")
		man_text.style_tag = u.ae(document.head, style_tag);
		man_text.style_tag.appendChild(document.createTextNode(""))
		window._man_text = man_text;
		window._man_text._width = u.browserW();
		window._man_text._height = u.browserH();
		window._man_text.scale = function() {
			window._man_text._width = u.browserW();
			window._man_text._height = u.browserH();
			var i, node;
			for(i = 0; node = window._man_text.nodes[i]; i++) {
				if(node.parentNode) { 
					node.scaleText();
				}
				else {
					window._man_text.nodes.splice(window._man_text.nodes.indexOf(node), 1);
					if(!window._man_text.nodes.length) {
						u.e.removeEvent(window, "resize", window._man_text.scale);
						window._man_text = false;
						break;
					}
				}
			}
		}
		u.e.addEvent(window, "resize", window._man_text.scale);
		window._man_text.precalculate = function() {
			var i, node, tag;
			for(i = 0; node = window._man_text.nodes[i]; i++) {
				if(node.parentNode) { 
					var settings = node.text_settings;
					for(tag in settings) {
						if(settings[tag].max_width && settings[tag].min_width) {
							settings[tag].width_factor = settings[tag].max_width-settings[tag].min_width;
						}
						else if(node._man_text.max_width && node._man_text.min_width) {
							settings[tag].max_width = node._man_text.max_width;
							settings[tag].min_width = node._man_text.min_width;
							settings[tag].width_factor = node._man_text.max_width-node._man_text.min_width;
						}
						else {
							settings[tag].width_factor = false;
						}
						if(settings[tag].max_height && settings[tag].min_height) {
							settings[tag].height_factor = settings[tag].max_height-settings[tag].min_height;
						}
						else if(node._man_text.max_height && node._man_text.min_height) {
							settings[tag].max_height = node._man_text.max_height;
							settings[tag].min_height = node._man_text.min_height;
							settings[tag].height_factor = node._man_text.max_height-node._man_text.min_height;
						}
						else {
							settings[tag].height_factor = false;
						}
						settings[tag].size_factor = settings[tag].max_size-settings[tag].min_size;
						if(!settings[tag].unit) {
							settings[tag].unit = node._man_text.unit;
						}
					}
				}
			}
		}
	}
	var tag;
	node._man_text = {};
	for(tag in node.text_settings) {
		if(tag == "min_height" || tag == "max_height" || tag == "min_width" || tag == "max_width" || tag == "unit") {
			node._man_text[tag] = node.text_settings[tag];
			node.text_settings[tag] = null;
			delete node.text_settings[tag];
		}
		else {
			selector = "."+node.text_key + ' ' + tag + ' ';
			node.css_rules_index = window._man_text.style_tag.sheet.insertRule(selector+'{}', 0);
			node.text_settings[tag].css_rule = window._man_text.style_tag.sheet.cssRules[0];
		}
	}
	window._man_text.nodes.push(node);
	window._man_text.precalculate();
	node.scaleText();
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(typeof(timer._a) == "function") {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(typeof(node[timer._a]) == "function") {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		if(typeof(this._timers[id]._a) == "function") {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(typeof(node[this._timers[id]._a]) == "function") {
			node[this._timers[id]._a](this._timers[id]._p);
		}
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.getVar = function(param, url) {
	var string = url ? url.split("#")[0] : location.search;
	var regexp = new RegExp("[\&\?\b]{1}"+param+"\=([^\&\b]+)");
	var match = string.match(regexp);
	if(match && match.length > 1) {
		return match[1];
	}
	else {
		return "";
	}
}
if(false && document.documentMode <= 10) {
	Util.appendElement = u.ae = function(_parent, node_type, attributes) {
		try {
			var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
			if(attributes) {
				var attribute;
				for(attribute in attributes) {
					if(!attribute.match(/^(value|html)$/)) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
			}
			node = _parent.appendChild(node);
			if(attributes) {
				if(attributes["value"]) {
					node.value = attributes["value"];
				}
				if(attributes["html"]) {
					node.innerHTML = attributes["html"];
				}
			}
			return node;
		}
		catch(exception) {
			u.exception("u.ae (desktop_ie10)", arguments, exception);
		}
	}
	Util.insertElement = u.ie = function(_parent, node_type, attributes) {
		try {
			var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
			if(attributes) {
				var attribute;
				for(attribute in attributes) {
					if(!attribute.match(/^(value|html)$/)) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
			}
			node = _parent.insertBefore(node, _parent.firstChild);
			if(attributes) {
				if(attributes["value"]) {
					node.value = attributes["value"];
				}
				if(attributes["html"]) {
					node.innerHTML = attributes["html"];
				}
			}
			return node;
		}
		catch(exception) {
			u.exception("u.ie (desktop_ie10)", arguments, exception);
		}
	}
}


/*u-settings.js*/
u.ga_account = '';
u.ga_domain = '';
u.gapi_key = '';


/*u-googleanalytics.js*/
if(u.ga_account) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.defer=true;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', u.ga_account, u.ga_domain);
    ga('send', 'pageview');
	u.stats = new function() {
		this.pageView = function(url) {
			ga('send', 'pageview', url);
		}
		this.event = function(node, _options) {
			var event = false;
			var eventCategory = "Uncategorized";
			var eventAction = null;
			var eventLabel = null;
			var eventValue = null;
			var nonInteraction = false;
			var hitCallback = null;
			if(typeof(_options) == "object") {
				var _argument;
				for(_argument in _options) {
					switch(_argument) {
						case "event"				: event					= _options[_argument]; break;
						case "eventCategory"		: eventCategory			= _options[_argument]; break;
						case "eventAction"			: eventAction			= _options[_argument]; break;
						case "eventLabel"			: eventLabel			= _options[_argument]; break;
						case "eventValue"			: eventValue			= _options[_argument]; break;
						case "nonInteraction"		: nonInteraction		= _options[_argument]; break;
						case "hitCallback"			: hitCallback			= _options[_argument]; break;
					}
				}
			}
			if(!eventAction && event && event.type) {
				eventAction = event.type;
			}
			else if(!eventAction) {
				eventAction = "Unknown";
			}
			if(!eventLabel && event && event.currentTarget && event.currentTarget.url) {
				eventLabel = event.currentTarget.url;
			}
			else if(!eventLabel) {
				eventLabel = this.nodeSnippet(node);
			}
			ga('send', 'event', {
				"eventCategory": eventCategory, 
				"eventAction": eventAction,
				"eventLabel": eventLabel,
				"eventValue": eventValue,
				"nonInteraction": nonInteraction,
				"hitCallback": hitCallback
			});
		}
		// 	
		// 	//       slot,		
		// 	//       name,		
		// 	//       value,	
		// 	//       scope		
		// 	
		this.nodeSnippet = function(node) {
			return u.cutString(u.text(node).trim(), 20) + "(<"+node.nodeName+">)";
		}
	}
}


/*i-page.js*/
Util.Objects["page"] = new function() {
	this.init = function(page) {
		page.hN = u.qs("#header");
		page.hN.service = u.qs("ul.servicenavigation", page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);
		page.fN = u.qs("#footer");
		page.fN.service = u.qs("ul.servicenavigation", page.fN);
		page.resized = function() {
			if(this.cN && this.cN.scene && typeof(this.cN.scene.resized) == "function") {
				this.cN.scene.resized();
			}
		}
		page.scrolled = function() {
			if(this.cN && this.cN.scene && typeof(this.cN.scene.scrolled) == "function") {
				this.cN.scene.scrolled();
			}
		}
		page.ready = function() {
			u.bug("page.ready:" + u.nodeId(this));
			if(!this.is_ready) {
				this.is_ready = true;
				u.e.addWindowEvent(this, "resize", this.resized);
				u.e.addWindowEvent(this, "scroll", this.scrolled);
				this.initHeader();
			}
		}
		page.initHeader = function() {
			var frontpage_link = u.qs("li.front a", this.nN);
			if(frontpage_link) {
				var logo = u.ae(this.hN, "a", {"class":"logo", "href":frontpage_link.href, "html":frontpage_link.innerHTML});
				u.ce(logo, {"type":"link"});
			}
			if(this.fN.service) {
				var node, i;
				var nodes = u.qsa("li", this.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ie(this.hN.service, node);
				}
				this.fN.removeChild(this.fN.service);
			}
		}
		page.ready();
	}
}
u.e.addDOMReadyEvent(u.init);


/*i-front.js*/
Util.Objects["front"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.seed_form = u.qs(".seed_form");
			u.f.init(this.seed_form);
		}
		scene.ready();
	}
}


/*i-demo.js*/
Util.Objects["demo"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
		}
		scene.ready();
	}
}


/*i-login.js*/
Util.Objects["login"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this._form = u.qs("form", this);
			u.f.init(this._form);
		}
		scene.ready();
	}
}


/*i-seeds.js*/
Util.Objects["seeds"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			u.request(this, "/seed/getSeedsJson", {callback: "seedsJson"});
		}
		scene.seedsJson = function(response) {
			this.seeds = response;
			var table = new Tabulator("#seeds_table", {
			height:205, 
			data:response, 
			layout:"fitColumns", 
			columns:[ 
				{title:"Begrebsgruppe", field:"concept_group", align:"left"},
				{title:"Ord", field:"name", width:150},
				{title:"Ordklasse", field:"col"},
			],
			rowClick:function(e, row){ 
				alert("Row " + row.getData().id + " Clicked!!!!");
			},
			});
		}
		scene.ready();
	}
}

/*i-seed_edit.js*/
Util.Objects["seed_edit"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.form = u.qs("form", this);
			u.f.init(this.form);
		}
		scene.ready();
	}
}


/*m-rhymes.js*/
Util.Objects["rhymes"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.form = u.qs(".form", this);
			u.f.init(this.form);
			this.form.scene = this;
			this.form.submitted = function(event) {
				this.response = function(response) {
					var ul_results = u.qs("div.results ul", this.scene);
					var results = u.qs("div.results ul", response);
					if(ul_results) {
						u.pn(ul_results).removeChild(ul_results);
					}
					u.ie(u.qs("div.results", this.scene), results);
				}
				u.request(this, this.action, {"method":"post", "params" : u.f.getParams(this)})
			}
		}
		scene.ready();
	}
}


/*m-phonetic_search.js*/
Util.Objects["phonetic_search"] = new function() {
	this.init = function(scene) {
		scene.resized = function() {
		}
		scene.scrolled = function() {
		}
		scene.ready = function() {
			this.form = u.qs(".form", this);
			u.f.init(this.form);
			this.form.scene = this;
			this.form.input_search_string = u.qs("#input_search_string", this.form);
			this.results = u.qs("div.results", this);
			this.form.submitted = function(event) {
				this.response = function(response) {
					var new_results = u.qs("div.results", response);
					u.pn(this.scene.results).replaceChild(new_results, this.scene.results);
					this.scene.ready();
				}
				u.request(this, this.action, {"method":"POST", "data" : u.f.getParams(this)})
			}
		}
		scene.ready();
	}
}

