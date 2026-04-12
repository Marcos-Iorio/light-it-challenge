import { describe, it, expect, beforeEach } from "vitest";
import useToastStore from "@/stores/toastStore";

beforeEach(() => {
  useToastStore.setState({ toasts: [] });
});

describe("toastStore", () => {
  describe("initial state", () => {
    it("starts with an empty toasts array", () => {
      expect(useToastStore.getState().toasts).toEqual([]);
    });
  });

  describe("addToast", () => {
    it("adds a toast to the list", () => {
      useToastStore.getState().addToast({ type: "success", message: "Done!" });
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });

    it("assigns an auto-generated id to each toast", () => {
      useToastStore.getState().addToast({ type: "success", message: "Hello" });
      const { id } = useToastStore.getState().toasts[0];
      expect(id).toBeDefined();
      expect(typeof id).toBe("string");
      expect(id!.length).toBeGreaterThan(0);
    });

    it("assigns unique ids to different toasts", () => {
      useToastStore.getState().addToast({ type: "success", message: "First" });
      useToastStore.getState().addToast({ type: "error", message: "Second" });
      const [a, b] = useToastStore.getState().toasts;
      expect(a.id).not.toBe(b.id);
    });

    it("preserves type and message", () => {
      useToastStore.getState().addToast({ type: "error", message: "Something went wrong" });
      const toast = useToastStore.getState().toasts[0];
      expect(toast.type).toBe("error");
      expect(toast.message).toBe("Something went wrong");
    });

    it("appends without removing existing toasts", () => {
      useToastStore.getState().addToast({ type: "success", message: "First" });
      useToastStore.getState().addToast({ type: "information", message: "Second" });
      expect(useToastStore.getState().toasts).toHaveLength(2);
    });
  });

  describe("removeToast", () => {
    it("removes the toast with the given id", () => {
      useToastStore.getState().addToast({ type: "success", message: "Hello" });
      const { id } = useToastStore.getState().toasts[0];
      useToastStore.getState().removeToast(id);
      expect(useToastStore.getState().toasts).toHaveLength(0);
    });

    it("only removes the targeted toast", () => {
      useToastStore.getState().addToast({ type: "success", message: "First" });
      useToastStore.getState().addToast({ type: "error", message: "Second" });
      const [first] = useToastStore.getState().toasts;
      useToastStore.getState().removeToast(first.id);
      expect(useToastStore.getState().toasts).toHaveLength(1);
      expect(useToastStore.getState().toasts[0].message).toBe("Second");
    });

    it("is a no-op when the id does not exist", () => {
      useToastStore.getState().addToast({ type: "success", message: "Keep me" });
      useToastStore.getState().removeToast("non-existent-id");
      expect(useToastStore.getState().toasts).toHaveLength(1);
    });
  });
});
