new Vue({
  el: "#app",
  delimiters : ['[[',']]'],
  data() {
    return {
      message: "🐵 Hello World 🔮",
      timestamp: `Timestamp ${new Date().toLocaleString()}`,
      bannerHeight: 0,
      navHeight: 0,
      navFill: false,
      navActive: false
    }
  },
  mounted() {
    this.navHeight = this.$refs.navBlock.clientHeight;
    this.bannerHeight = this.$refs.bannerBlock.clientHeight - this.navHeight;
    
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    clickNav() {
      this.navActive = !this.navActive;
    },
    onScroll(e) {
      this.windowTop = window.top.scrollY
      
      if ( this.windowTop > this.bannerHeight) {
        this.navFill = true;
      } else {
        this.navFill = false;
      }

      this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
    }
  }
})