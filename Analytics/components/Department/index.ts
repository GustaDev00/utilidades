import RemoveAccents from "javascripts/RemoveAccents";

export const Department = (tracker: any, target: HTMLElement) => {
  try {
    // desktop orderby
    if (target.matches("ul.form-orderby__list-options li a")) {
      const department = window.location.pathname;
      const orderByValue = target.getAttribute("data-value").substring(7);
      const result = `${department}_orderby_${RemoveAccents(
        orderByValue
      )}`.toLowerCase();

      tracker.send("event", "click", "Orderby Click", result);
    }

    // mobile orderby
    if (target.matches("ul.pagetools__modal-options li a")) {
      const department = window.location.pathname;
      const orderByValue = target.getAttribute("data-value").substring(7);
      const result = `${department}_orderby_${RemoveAccents(
        orderByValue
      )}`.toLowerCase();

      tracker.send("event", "click", "Orderby Click", result);
    }

    // filters
    if (target.matches("[class^=sr]:not(.sr_selected)")) {
      const department = window.location.pathname;
      const filterType = target.closest("fieldset")?.children[0].textContent;
      const filterValue = target.closest("label").textContent.trim();
      const result = `${department}_filter_${filterType}_${RemoveAccents(
        filterValue
      )}`.toLowerCase();

      tracker.send("event", "click", "Filter Click", result);
    }

    // fast filters
    if (target.matches("div#top-searches .top-searches__wrapper a")) {
      const fastFilter = target.getAttribute("href");
      const result = `fastfilter_${RemoveAccents(fastFilter)}`;

      tracker.send("event", "click", "Fast Filter Click", result);
    }
  } catch (err) {
    console.error("[Analytics - Department]", err);
  }
};
