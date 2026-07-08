const metrics = [
  { label: "SSR 路由", value: "4" },
  { label: "质量门禁", value: "8" },
  { label: "组件覆盖", value: "100%" },
];

const checks = [
  ["服务端渲染", "Next App Router page 可直接 SSR"],
  ["浏览器 API", "仅允许在 client boundary 中访问"],
  ["组件测试", "每个组件至少 render smoke test"],
  ["E2E", "针对生产预览服务执行 Playwright"],
];

export function DocsPage() {
  return (
    <>
      <section className="metric-grid" aria-label="模板指标">
        {metrics.map(item => (
          <div className="metric" key={item.label}>
            <p className="metric-label">{item.label}</p>
            <p className="metric-value">{item.value}</p>
          </div>
        ))}
      </section>
      <section className="panel" aria-labelledby="checks-title">
        <div className="panel-header">
          <div>
            <h2 id="checks-title" className="panel-title">企业级 SSR 基线</h2>
            <p className="page-subtitle">面向 Node SSR 部署的默认约束。</p>
          </div>
          <span className="badge">Ready</span>
        </div>
        <div className="panel-body">
          <table className="status-table">
            <thead>
              <tr>
                <th>能力</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {checks.map(([name, detail]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
