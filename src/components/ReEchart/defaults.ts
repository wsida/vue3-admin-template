/**
 * echart 默认基础配置
 * color、bg、title、legend、tooltip、xAxis、yAxis
 */
export const primaryColor = "#409EFF";
export const titleTextColor = "#303133";
export const regularTextColor = "#606266";
export const secondaryTextColor = "#909399";
export const borderColor = "#dcdfe6";

export const defaultColor = [
  primaryColor,
  "#67c23a",
  "#e6a23c",
  "#f56c6c",
  "#a0cfff",
  "#b3e19d",
  "#f3d19e",
  "#fab6b6"
];
export const defaultBg = "transparent";
export const defaultTitle = {
  left: 0,
  top: 0,
  textStyle: {
    fontSize: 16,
    color: titleTextColor
  },
  subtextStyle: {
    fontSize: 14,
    color: regularTextColor
  }
};
export const defaultLegend = {
  left: "center",
  bottom: "2%",
  type: "scroll",
  orient: "horizontal",
  textStyle: {
    color: regularTextColor
  }
};
export const defaultTooltip = {};
export const defaultToolbox = {
  right: 0,
  top: 0,
  orient: "vertical",
  feature: {
    saveAsImage: {},
    restore: {},
    dataView: {},
    dataZoom: {}
  }
};
export const defaultxAxis = {
  type: "category",
  axisLine: {
    show: false
  },
  axisTick: {
    show: true,
    lineStyle: {
      color: borderColor
    }
  },
  axisLabel: {
    show: true,
    textStyle: {
      color: regularTextColor
    }
  },
  splitLine: {
    show: false
  }
};
export const defaultyAxis = {
  type: "value",
  min: 0,
  axisLine: {
    show: false
  },
  axisTick: {
    show: true,
    lineStyle: {
      color: borderColor
    }
  },
  axisLabel: {
    show: true,
    textStyle: {
      color: regularTextColor
    }
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: borderColor
    }
  }
};
export const defaultGrid = {
  left: "12%",
  right: "4%",
  bottom: "16%",
  top: "4%"
};

export const defaultOption = {
  color: defaultColor,
  background: defaultBg,
  title: defaultTitle,
  tooltip: defaultTooltip,
  legend: defaultLegend,
  toolbox: defaultToolbox,
  xAxis: defaultxAxis,
  yAxis: defaultyAxis
};
