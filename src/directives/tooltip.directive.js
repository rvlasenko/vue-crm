export default {
  bind(el, {value}) {
    M.Tooltip.init(el, {html: value, position: 'top'});
  },
  unbind(el) {
    var tooltip = M.Tooltip.getInstance(el);
    
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
};