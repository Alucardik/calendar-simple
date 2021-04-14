<template>
  <div class="drag-n-drop__drop-zone" v-on:drop="onDrop" v-on:dragover.prevent v-on:dragenter.prevent>
    <div v-resize class="drag-n-drop__drag-item" v-for="item in filteredItems" :key="item.id"
         v-on:resize="onResize($event, item)"
         :style="renderItem(item)" draggable="true" v-on:dragstart="onDragStart($event, item)">
        {{ item.title }}
<!--        <div class="drag-n-drop__resize-field"></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "TableCell",

  created() {
    // const rzListener = require("element-resize-detector")();

  },

  props: {
    items: Array,
    column: Number
  },

  computed: {
    filteredItems() {
      return this.items.filter(item => item.column === this.column);
    },
  },

  methods: {
    onResize(evt, item) {
      if (item.firstRender) {
        item.firstRender = false;
        return;
      }
      // item.height = Math.round(evt.detail.height / 12.33);
      // item.duration += 15;
      // console.log("RESIZED");
      // console.log(evt.detail.height);
      // console.log(item.height);
      item.height = evt.detail.height;
    },

    onMouseLeave(evt) {
      console.log("LEFT!", evt.target.attributes);
    },

    renderItem(item) {
      return {"top": `calc(100% / 24 * ${item.row - 1}`,
              "height": `${item.height}px`};
    },

    onDragStart(evt, item)  {
      // this.timetable.forEach(cell => {
      //   cell.classList.add("date-cell__table-cell_on-top");
      // });
      console.log("Picked at:", evt.target);
      // this.$parent.moveCellsOnTop(true);
      // const chosenDiv = evt.target.closest(".date-cell__table-cell");
      // console.log("Picked at:", document.querySelectorAll(":hover"));
      // console.log("THIS:", this);
      // console.log("Drag comp", dragZone.componentOptions.propsData);
      // console.log(this.$props.column);
      // console.log("Drag evt:", evt);
      // console.log("params:", evt.target.closest(".date-cell__table-cell").row,
      //   evt.target.closest(".date-cell__table-cell").column);
      // item.row = evt.target.closest(".date-cell__table-cell").row;
      // item.column = evt.target.closest(".date-cell__table-cell").column;
      // console.log(evt.dataTransfer);
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData('itemID', item.id);
    },

    onDrop(evt) {
      // getting actual cell for drop-event
      evt.target.classList.add("drag-n-drop");
      const actCell = document.elementFromPoint(evt.clientX, evt.clientY);
      evt.target.classList.remove("drag-n-drop");
      console.log("Dropped at:", actCell);

      // this.timetable.forEach(cell => {
      //   cell.classList.remove("date-cell__table-cell_on-top");
      // });

      // console.log("Dropped at:", evt.target.nearest(".date-cell__table-cell"));
      // console.log("Items:", dropCell.componentOptions.propsData.items);
      // const item = evt.dataTransfer.getData("item");
      // console.log("Transferring:", item);
      // console.log("THIS:", this);
      // console.log(evt.dataTransfer);

      // this.items.push({title: evt.dataTransfer.getData("itemTitle"),
      //   id: evt.dataTransfer.getData("itemId")});
      // evt.dataTransfer.clearData();
      // this.$forceUpdate();

      // dropCell.componentOptions.propsData.items.push(item);
      // console.log("Drop Comp:", dropCell);
      // console.log("Drop evt:", evt);
      // const itemID = evt.dataTransfer.getData('itemID');
      // const item = this.draGnDropItems.find(it => it.id === itemID);
      // item.row = evt.target.row;
      // item.column = evt.target.column;
      // console.log("CELL", actCell.attributes.row.textContent)
      const itemID = evt.dataTransfer.getData('itemID');
      const item = this.items.find(it => it.id === itemID);
      item.column = this.column;
      item.row = parseInt(actCell.attributes["row"].textContent);
      item.firstRender = true;
      // let i = 0;
      // do {
      //
      // }
      // this.$parent.moveCellsOnTop(false);
    },
  }
}
</script>

<style scoped>

</style>
