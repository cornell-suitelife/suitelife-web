const fadeDown = {
  appear: function(node, done){
    node.style.display='none';
    $(node).slideUp(done);
    return {
      stop:function(){
        $(node).stop(true);
      }
    };
  },
  enter: function(){
    this.appear.apply(this,arguments);
  },
  leave: function(node, done){
    node.style.display='';
    $(node).slideDown(done);
    return {
      stop:function(){
        $(node).stop(true);
      }
    };              
  }
};

export {
  fadeDown
};