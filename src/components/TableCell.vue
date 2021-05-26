<template>
  <div class="drag-n-drop__drop-zone" @drop="onDrop" @dragover.prevent @dragenter.prevent>
<!--v-resize="{ callOnAdd: false }"  @resize="onResize($event, item)" -->
    <div v-for="item in filteredItems"
         :class="`drag-n-drop__drag-item ${item.isStriked && 'drag-n-drop__drag-item_striked'}`"
         :key="item.id"
         @click="onClick($event, item)"
         :style="renderItem(item)"
         draggable="true"
         @dragstart="onDragStart($event, item)">
        {{ item.title }}
<!--        <div class="drag-n-drop__resize-field"></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "TableCell",

  created() {

  },

  props: {
    items: Array,
    column: Number,
    stats: Array,
    probeNum: Number,
  },

  computed: {
    filteredItems() {
      return this.items.filter((item) => (item.column === this.column));
    },
  },

  methods: {
    onResize(evt, item) {
      if (item.firstRender) {
        item.firstRender = false;
        return;
      }
      item.height = evt.detail.height;
      item.firstRender = true;
    },

    renderItem(item) {
      return {"top": `calc(100% / 24 * ${item.row - 1}`,
              "margin-top": `calc(${item.half - 1} * 25px)`,
              "height": `${item.height}px`,
              "color":  (item.isTarget) ? "hsl(279, 89%, 36%)" : "white"};
    },

    onDragStart(evt, item)  {
      // this.timetable.forEach(cell => {
      //   cell.classList.add("date-cell__table-cell_on-top");
      // });
      // console.log("Picked at:", evt.target);
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
      // console.log("Dropped at:", actCell);

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
      const item = this.items.find((it) => it.id === itemID);
      item.column = this.column;
      item.row = parseInt(actCell.attributes["row"].textContent);
      item.half = parseInt(actCell.attributes["half"].textContent);
      // item.firstRender = true;
      // this.$parent.moveCellsOnTop(false);
    },

    onClick(evt, item) {
      const {isTarget, isStriked, targetNum} = item;

      // if (evt.target.classList.contains("drag-n-drop__drag-item_striked")) {
      //   if (isTarget) {
      //     --this.stats[this.probeNum - 1]["Targets_struck"];
      //   }
      //   --this.stats[this.probeNum - 1]["Total_words_struck"];
      // } else {
      //   if (isTarget) {
      //     ++this.stats[this.probeNum - 1]["Targets_struck"];
      //   }
      //   ++this.stats[this.probeNum - 1]["Total_words_struck"];
      // }
      // evt.target.classList.toggle("drag-n-drop__drag-item_striked");
      if (isStriked) {
        if (isTarget) {
          --this.stats[this.probeNum - 1]["Targets_struck"];
          --this.stats[this.probeNum - 1][`Target${targetNum + 1}_struck`];
        }
        --this.stats[this.probeNum - 1]["Total_words_struck"];
      } else {
        if (isTarget) {
          ++this.stats[this.probeNum - 1]["Targets_struck"];
          ++this.stats[this.probeNum - 1][`Target${targetNum + 1}_struck`];
        }
        ++this.stats[this.probeNum - 1]["Total_words_struck"];
      }
      item.isStriked = !item.isStriked;
      // console.log("Cell key", item);
    }
  }
}
</script>

<style scoped>

</style>
