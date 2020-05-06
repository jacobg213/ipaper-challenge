import { shallowMount } from "@vue/test-utils";
import IpPriceCalculator from "@/components/IpPriceCalculator.vue";

describe("IpPriceCalculator.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(IpPriceCalculator);
    expect(wrapper).toBeTruthy();
  });

  describe("calculate", () => {
    it("should recalculate the monthly price", () => {
      const wrapper = shallowMount(IpPriceCalculator);
      const component: any = wrapper.vm;
      component.recalculate();
      expect(component.price).toBe(5);

      // Example from the challenge description.
      wrapper.setData({
        flipBooks: 7,
        visitors: 24000
      });
      component.recalculate();
      expect(component.price).toBe(46);

      // Random example.
      wrapper.setData({
        flipBooks: 15,
        visitors: 25000
      });
      component.recalculate();
      expect(component.price).toBe(53.5);
    });

    it("should update FlipBook amount and recalculate the price", () => {
      const wrapper = shallowMount(IpPriceCalculator);
      const component: any = wrapper.vm;
      component.recalculate({ target: { value: 10 } } as any, "flipBooks");
      expect(component.flipBooks).toBe(10);
      expect(component.price).toBe(35);
    });

    it("should update expected visitors amount and recalculate the price", () => {
      const wrapper = shallowMount(IpPriceCalculator);
      const component: any = wrapper.vm;
      component.recalculate({ target: { value: 30000 } } as any, "visitors");
      expect(component.visitors).toBe(30000);
      expect(component.price).toBe(38);
    });
  });
});
