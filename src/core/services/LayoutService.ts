import objectPath from "object-path";
import { Actions } from "@/store/enums/StoreEnums";
import store from "@/store/";
import { config } from "@/core/helpers/config";

class LayoutService {
  /**
   * @description initialize default layout
   */
  public static init(): void {
    LayoutService.initLayout();
  }

  /**
   * @description init layout
   */
  public static initLayout(): void {
    store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
      qulifiedName: "id",
      value: "kt_body",
    });

    if (objectPath.get(config.value, "loader.display")) {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading-enabled");
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "page-loading");
    }
  }
}

export default LayoutService;
