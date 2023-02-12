new Vue({
  el: "#app",
  delimiters : ['[[',']]'],
  data() {
    return {
      bannerHeight: 0,
      navHeight: 0,
      navFill: false,
      navActive: false,
      teamActive: false,
      tags: [],
      selected: "",
      articles: []
    }
  },
  mounted() {
    this.navHeight = this.$refs.navBlock.clientHeight;
    this.bannerHeight = this.$refs.bannerBlock.clientHeight - this.navHeight;
    
    window.addEventListener("scroll", this.onScroll);

    for (let [key, value] of Object.entries(this.$refs)) {
      if (/^n-/.test(key)) {
        this.tags.push(key.slice(2));    
      }
    }

    this.selected = this.tags[0];

    
    
    // console.log(this.articles);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    filterNews(e) {
      this.selected = e.target.value;

      this.articles = Object.keys(this.$refs).filter((ref) => {
        if(ref.includes('article')){
          return true
        }
        return false
      }).map((val) => {
        
        this.$refs[val].classList.remove('active');
        // let list = this.$refs[val].classList; 
        if ( this.$refs[val].classList.contains(this.selected)) {
          this.$refs[val].classList.value = this.$refs[val].classList.value + ' active'; 
        }
        // console.log(list);
        // console.log(list.indexOf('news'));
        // // if ( this.$refs[val].classList.includes(this.selected)) {
        //   // console.log(list);
        //   console.log(list.indexOf('news'));
        // // }
        // return this.$refs[val];
      })

    },
    clickNav() {
      this.navActive = !this.navActive;
    },
    closeNav() {
      this.navActive = false;
    },
    closeProfile() {
      const el = document.getElementsByClassName('person');

      Object.values(el).map(item => {
        item.classList.remove("profile-active");
        console.log(item);
      });
    },
    showProfile(person) {
      const myEl = this.$refs[person];
      const el = document.getElementsByClassName('person');

      Object.values(el).map(item => {
        item.classList.remove("profile-active");
        console.log(item);
      });

      this.$smoothScroll({
        scrollTo: myEl,
        offset: -100,
        duration: 400,
      });

      setTimeout(() => {
        this.teamActive = true;
        this.$refs[person].classList.value = this.$refs[person].classList.value + ' profile-active';
      }, 350);
      
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