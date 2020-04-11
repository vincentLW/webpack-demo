import $ from "jquery";
export default () => {
  /* i18n Definition */

  (function () {
    function Translator(language) {
      this.language = language;
      this.translateText = function () {
        const that = this;
        const argArray = Array.prototype.slice.call(arguments);
        const key = argArray.shift();
        const args = argArray;

        let value = void 0;

        key.split(".").forEach((val) => {
          if (value === undefined) {
            value = that.language[val];
            return;
          }
          value = value[val];
        });

        if (value === undefined) {
          console.error(`${key} is not defined in i18n`);
          return "";
        }

        return value.replace(/{(\d+)}/g, (match, matchVal) => {
          if (args[matchVal] === undefined) {
            return match;
          }
          return args[matchVal];
        });
      };

      // switch language
      this.setLanguage = function (language) {
        this.language = language;
      };
    }

    const translator = new Translator({
      hello: "world",
    });
    this.i18n = translator.translateText.bind(translator);
    this.i18n.translator = translator;
  }.call(window));

  //get language file
  let languageSource = localStorage.getItem("language");
  if (!languageSource) {
    languageSource = "zh-tw";
    localStorage.setItem("language", languageSource);
  }
  //add script
  $('<script type="text/javascript"></script>')
    .attr("src", `/i18n/locals/${languageSource}.js`)
    .appendTo($("head"));
  i18n.translator.setLanguage(window.languageData);
  //bind event
  $(() => {
    $("#LanguageDropdownMenuButton")
      .text(i18n(languageSource))
      .addClass(languageSource);

    $(".fanBtn").each(function (index, item) {
      const btnText = $(item).data("fan");
      $(item).text(i18n(btnText));
      $(item).addClass(languageSource);
    });

    $(".fanBtn").click(function () {
      localStorage.setItem("language", $(this).data("fan"));
      window.location.reload();
    });

    $("[data-lang]").each((index, item) => {
      const lang = i18n($(item).data("lang"));
      if (
        $(item).prop("tagName") === "INPUT" ||
        $(item).prop("tagName") === "TEXTAREA"
      ) {
        $(item).attr("placeholder", lang);
        $(item).addClass(languageSource);
      } else {
        $(item).text(lang);
        $(item).addClass(languageSource);
      }
    });
  });
};
