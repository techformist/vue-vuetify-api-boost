<template>
  <v-dialog v-model="showDialog" persistent max-width="1100px">
    <SubPanel>
      <template slot="toolbar-items">
        <span class="subtitle-2">New/Edit Service</span>
      </template>

      <template slot="content">
        <v-card flat>
          <v-card-text>
            <v-form ref="form" v-model="validInput">
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    :items="['Request', 'Complaint']"
                    label="Type"
                    v-model="activeServiceReq['type_cd']"
                    required
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    :items="['Created', 'In Progress', 'Closed', 'Cancelled']"
                    label="Status"
                    v-model="activeServiceReq['status_cd']"
                    required
                  >
                  </v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <DatePick
                    label="Start Date"
                    :field.sync="activeServiceReq.planned_start_date"
                  >
                  </DatePick>
                </v-col>
                <v-col cols="12" md="3">
                  <DatePick
                    label="End Date"
                    :field.sync="activeServiceReq.planned_end_date"
                  >
                  </DatePick>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea
                    label="Description"
                    v-model="activeServiceReq['description']"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea
                    label="Remarks"
                    v-model="activeServiceReq['remarks']"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="closeDialog">Cancel</v-btn>
            <v-btn color="primary" @click="saveRecord">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </SubPanel>
  </v-dialog>
</template>

<script>
import { sync } from "vuex-pathify";
import { mapActions } from "vuex";
import SubPanel from "./layouts/SubPanel";

export default {
  data() {
    return {
      validInput: true
    };
  },
  props: {
    value: Boolean
  },

  computed: {
    ...sync("serviceReq", ["activeServiceReq"]),

    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  components: {
    SubPanel,
    DatePick: () => import("./util/DatePick")
  },

  methods: {
    ...mapActions("serviceReq", ["createServiceReq", "updateServiceReq"]),

    saveRecord() {
      //   this.activeServiceReq = this.activeServiceReq;
      if (!this.activeServiceReq["id"])
        this.createServiceReq(this.activeServiceReq);
      else this.updateServiceReq(this.activeServiceReq);

      this.closeDialog();
    },

    closeDialog() {
      this.showDialog = false;
    }
  }
};
</script>
