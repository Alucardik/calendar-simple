<template>
  <div class="drag-n-drop__drop-zone" @drop="onDrop" @dragover.prevent @dragenter.prevent>
<!--v-resize="{ callOnAdd: false }"  @resize="onResize($event, item)" -->
    <div v-for="item in filteredItems"
         :class="`drag-n-drop__drag-item ${item.isStriked && 'drag-n-drop__drag-item_striked'}`"
         :key="item.id"
         @click="onClick($event, item)"
         :style="renderItem(item)"
         draggable="true"
         @drop="handleCollision($event, item)"
         @dragstart="onDragStart($event, item)">
      <span>{{ item.title }}</span>
      <!--        <div class="drag-n-drop__resize-field"></div>-->
    </div>
    <div class="drag-n-drop__pseudo-block-zone drag-n-drop__pseudo-block-zone_type_perm"/>
    <div class="drag-n-drop__pseudo-block-zone"/>
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
      return {
        "top": `calc(100% / 24 * ${item.row - 1} + ${item.half - 1} * 25px)`,
        "left": `calc(${item.posNum} * (95% / ${item.neighbours.length + 1} + 5px))`,
        // "height": `${item.height}px`,
        "width": `calc(95% / ${item.neighbours.length + 1} - 5px)`,
        // "color":  (item.isTarget) ? "hsl(279, 89%, 36%)" : "white"
      };
    },

    onDragStart(evt, item)  {
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData('itemID', item.id);
    },

    onDrop(evt) {
      // getting actual cell for drop-event
      evt.target.classList.add("drag-n-drop");
      const actCell = document.elementFromPoint(evt.clientX, evt.clientY);
      evt.target.classList.remove("drag-n-drop");
      console.log("DROPPED", actCell);

      if (actCell.classList.contains("date-cell__table-cell")) {
        const itemID = evt.dataTransfer.getData('itemID');
        const item = this.items.find((it) => it.id === itemID);
        // this.$emit("add-item", item);
        // this.$refs.cell = actCell;
        // this.$refs.cell.click();
        item.column = this.column;
        item.row = parseInt(actCell.attributes["row"].textContent);
        item.half = parseInt(actCell.attributes["half"].textContent);
        item.neighbours.forEach((it) => {
          if (it.posNum !== 0) {
            --it.posNum;
          }
          // find and delete current items from neighbours
          const delInd = it.neighbours.findIndex((delIt) => delIt.id === item.id);
          it.neighbours.splice(delInd, 1);
        });
        item.neighbours = [];
        item.posNum = 0;
      } else {
        // const collisionPath = document.elementsFromPoint(evt.clientX, evt.clientY),
        //   collisionCell = collisionPath.find((el) => el.classList.contains("date-cell__table-cell")),
        //   collisionObj = collisionPath.find((el) => el.classList.contains("drag-n-drop__drag-item"));
        // console.log("Collision in", collisionCell);
        // console.log("Collision with", collisionObj);
      }
    },

    handleCollision(e, item) {
      // temporary limitation of 1 neighbour at max
      if (item.neighbours.length) {
        return;
      }
      const draggedItem = this.items.find((it) => it.id === e.dataTransfer.getData('itemID'));
      // prevent items self collisions
      if (item === draggedItem) {
        return;
      }
      draggedItem.posNum = item.posNum + 1;
      draggedItem.neighbours = Object.create(item.neighbours);
      draggedItem.neighbours.push(item);
      item.neighbours.forEach((it) => {
        it.neighbours.push(draggedItem);
        if (it.posNum >= draggedItem.posNum) {
          ++it.posNum;
        }
      });
      item.neighbours.push(draggedItem);
      console.log("Item after neighbours", item.neighbours);
      console.log("Dragged item neighbours", draggedItem.neighbours);
      draggedItem.column = this.column;
      draggedItem.row = item.row;
      draggedItem.half = item.half;
    },

    onClick(evt, item) {
      const {isTarget, isStriked, targetNum} = item;
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
    }
  }
}
</script>

<style scoped>

</style>
