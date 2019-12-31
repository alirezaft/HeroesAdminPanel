<template>
  <vuestic-sidebar :hidden="isOpen">
    <template slot="menu">
      <sidebar-link-group>
      <span slot="title">
        <span class="sidebar-menu-item-icon fa fa-database"></span>
          <span>Queries</span>
        </span>
        <sidebar-link :to="{name : 'Users'}">
          <span slot="title">
            <span class="sidebar-menu-item-icon fa fa-users"></span>
            <span>Clans</span>
          </span>
        </sidebar-link>
        <sidebar-link :to="{name : 'Users'}">
          <span slot="title">
            <span class="sidebar-menu-item-icon fa fa-user"></span>
              <span>Users</span>
          </span>
        </sidebar-link>
      </sidebar-link-group>
      <sidebar-link :to="{name: 'Matches'}">
        <span slot="title">
          <span class="sidebar-menu-item-icon fa fa-gamepad"></span>
          <span>Matches</span>
        </span>
      </sidebar-link>
      <sidebar-link :to="{name: 'UploadMap'}">
        <span slot="title">
          <span class="sidebar-menu-item-icon fa fa-map"></span>
          <span>Upload map</span>
        </span>
      </sidebar-link>
    </template>
  </vuestic-sidebar>
</template>

<script>

import VuesticSidebar
  from '../../../vuestic-theme/vuestic-components/vuestic-sidebar/VuesticSidebar'
import SidebarLink from './components/SidebarLink'
import SidebarLinkGroup from './components/SidebarLinkGroup'

export default {
  name: 'app-sidebar',
  components: {
    VuesticSidebar,
    SidebarLink,
    SidebarLinkGroup,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
}

</script>
