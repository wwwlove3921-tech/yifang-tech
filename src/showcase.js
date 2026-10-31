(function yfShowcaseModule(yfShowGlobal){
  'use strict';
  const yfShowAlerts=[
    {id:'missing',title:'业务佐证待补充',kind:'资料缺口',voucher:'DEMO-001',business:'设备采购',amount:1.88,description:'发票与付款记录已关联，验收资料尚未齐备。系统将缺口提示给业务负责人，协助确认业务背景。',basis:'示例内部规则：采购业务应关联合同、验收与付款等相关资料，供专业人员核对。',evidence:[['电子发票',true],['采购合同',true],['付款记录',true],['验收资料',false]],action:'补充验收或其他可说明业务事实的资料 → 专业人员复核 → 留存处理记录。'},
    {id:'buyer',title:'交易主体信息待核实',kind:'字段差异',voucher:'DEMO-002',business:'系统维护',amount:0.36,description:'示例发票的购买方名称为“示例企业 B”，合同签约方为“示例企业 A”。主体关系与业务归属需要进一步核实。',basis:'示例比对规则：交叉核对发票购买方、合同签约方及付款主体，不将名称差异直接判定为违规。',evidence:[['电子发票',true],['服务合同',true],['付款记录',true],['主体关系说明',false]],action:'核实名称、代付或关联业务背景 → 确认是否需要更正资料 → 记录人工复核结论。'},
    {id:'period',title:'研发费用期间待核对',kind:'归集线索',voucher:'DEMO-003',business:'研发材料',amount:1.2,description:'材料领用记录属于 4 月，所关联项目的示例计划于 5 月启动。需结合实际研发活动确认期间与归属。',basis:'示例核对规则：将研发立项、活动记录、材料领用和费用期间关联，供财务与项目负责人共同核对。',evidence:[['费用凭证',true],['项目立项',true],['领料记录',true],['期间归属说明',false]],action:'核对实际活动及费用归属 → 按适用口径完善归集与材料 → 留存确认过程。'}
  ];
  const yfShowFinance={
    overview:{title:'经营总览',chartTitle:'收入与支出趋势',seriesNames:['收入','支出'],first:[68,74,81,77,92,103],second:[50,54,57,56,64,70],costTitle:'支出构成',costs:[['人员费用',126],['采购与服务',118],['运营费用',72],['其他支出',35]],note:'按示例经营收支口径汇总，收支差额不等同于会计利润。'},
    research:{title:'研发投入',chartTitle:'研发预算与费用归集',seriesNames:['计划预算','已归集费用'],first:[12,14,16,16,20,22],second:[9,12,14,13,17,19],costTitle:'研发费用构成',costs:[['人员费用',42],['直接投入',18],['折旧摊销',12],['委托研发',12]],note:'按示例项目管理口径归集，不等同于税收优惠可扣除金额。'}
  };
  const yfShowProjects=[
    {id:'RD-01',name:'智能票据识别与关联',dates:'2026.01 — 2026.09',budget:48,collected:29.4,milestones:[['需求与立项','已完成','2026.01 · 立项记录已关联'],['原型与数据准备','已完成','2026.03 · 阶段记录已关联'],['模型验证与迭代','进行中','2026.06 · 实验记录持续补充'],['试运行与阶段验收','待开展','2026.09 · 按计划推进']],materials:[['项目立项与研发计划','已关联'],['研发过程与实验记录','持续更新'],['阶段成果与验收材料','待补充']],record:'实验记录 EXP-018 ↔ 领料记录 MAT-006 ↔ 费用凭证 V-042',recordNote:'示例关联：一次模型测试的研发活动、材料使用与费用记录，可回看来源。'},
    {id:'RD-02',name:'企业知识检索与问答',dates:'2026.02 — 2026.08',budget:36,collected:23.8,milestones:[['需求与立项','已完成','2026.02 · 任务范围已记录'],['知识整理与评测设计','已完成','2026.03 · 测试方案已关联'],['检索优化与内部测试','已完成','2026.05 · 评测记录已关联'],['试运行与阶段验收','进行中','2026.08 · 使用反馈持续收集']],materials:[['研发计划与人员安排','已关联'],['评测数据与测试记录','已关联'],['阶段成果与试运行记录','持续更新']],record:'研发工时 TIME-024 ↔ 评测记录 TEST-011 ↔ 费用凭证 V-063',recordNote:'示例关联：参与人员、研发活动与人员费用归集记录，支持交叉核对。'},
    {id:'RD-03',name:'业务协同自动化引擎',dates:'2026.04 — 2026.12',budget:60,collected:15.6,milestones:[['需求与立项','已完成','2026.04 · 立项记录已关联'],['架构与接口验证','进行中','2026.06 · 技术方案持续完善'],['流程开发与联调','待开展','2026.09 · 待进入下一阶段'],['试运行与阶段验收','待开展','2026.12 · 按计划推进']],materials:[['项目立项与技术路线','已关联'],['接口验证与测试记录','持续更新'],['系统联调与验收材料','待形成']],record:'接口实验 EXP-031 ↔ 测试设备 EQ-008 ↔ 费用凭证 V-086',recordNote:'示例关联：技术验证记录、设备使用记录与相关费用凭证，形成项目材料索引。'}
  ];
  const yfShowSum=yfShowValues=>Math.round(yfShowValues.reduce((yfShowA,yfShowB)=>yfShowA+yfShowB,0)*100)/100;
  const yfShowModel={
    alerts:yfShowAlerts,projects:yfShowProjects,months:['1月','2月','3月','4月','5月','6月'],
    getAlert(yfShowId){return yfShowAlerts.find(yfShowItem=>yfShowItem.id===yfShowId)||yfShowAlerts[0];},
    finance(yfShowMode){const yfShowSelected=yfShowMode==='research'?'research':'overview';const yfShowData=yfShowFinance[yfShowSelected];const yfShowFirst=yfShowSum(yfShowData.first),yfShowSecond=yfShowSum(yfShowData.second);return {...yfShowData,mode:yfShowSelected,totalFirst:yfShowFirst,totalSecond:yfShowSecond,difference:Math.round((yfShowFirst-yfShowSecond)*100)/100,percent:Math.round(yfShowSecond/yfShowFirst*100),costTotal:yfShowSum(yfShowData.costs.map(yfShowItem=>yfShowItem[1]))};},
    project(yfShowId){const yfShowProject=yfShowProjects.find(yfShowItem=>yfShowItem.id===yfShowId)||yfShowProjects[0];return {...yfShowProject,completed:yfShowProject.milestones.filter(yfShowMilestone=>yfShowMilestone[1]==='已完成').length,totalMilestones:yfShowProject.milestones.length,budgetUsed:Math.round(yfShowProject.collected/yfShowProject.budget*100)};}
  };
  yfShowGlobal.YFShowcaseModel=yfShowModel;
  if(typeof document==='undefined')return;
  function yfShowInit(){
    const yfShowSection=document.querySelector('#scenarios');
    if(!yfShowSection)return;
    const yfShowPanel=yfShowSection.querySelector('#showcase-panel');
    const yfShowTabs=Array.from(yfShowSection.querySelectorAll('[data-showcase-scene]'));
    let yfShowScene='compliance',yfShowAlertId='missing',yfShowFinanceMode='overview',yfShowProjectId='RD-01';
    const yfShowEsc=yfShowText=>String(yfShowText).replace(/[&<>"']/g,yfShowChar=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[yfShowChar]));
    const yfShowFormat=yfShowValue=>Number(yfShowValue).toLocaleString('zh-CN',{maximumFractionDigits:2});
    const yfShowHeader=(yfShowTitle,yfShowDescription,yfShowLabel)=>`<div class="showcase-scene-header"><div><h3>${yfShowTitle}</h3><p>${yfShowDescription}</p></div><span class="showcase-label">${yfShowLabel}</span></div>`;
    const yfShowMetric=(yfShowLabel,yfShowValue,yfShowUnit)=>`<div class="showcase-metric"><span class="showcase-metric-label">${yfShowLabel}</span><strong class="showcase-metric-value">${yfShowFormat(yfShowValue)}</strong><span class="showcase-metric-unit">${yfShowUnit}</span></div>`;
    function yfShowRenderCompliance(){
      const yfShowAlert=yfShowModel.getAlert(yfShowAlertId);
      return yfShowHeader('从账目线索，到有依据的专业复核。','AI 辅助识别资料缺口、字段差异与费用归属线索，把需要关注的事项和相关证据送到专业人员面前。','AI 辅助 · 人工确认')+`
        <div class="showcase-flow" aria-label="账目辅助分析流程"><div class="showcase-flow-node"><strong>01 接入业务资料</strong><small>凭证 / 合同 / 项目记录</small></div><div class="showcase-flow-node showcase-ai-node"><strong>02 AI 关联与分析</strong><small>字段比对 / 差异提示</small></div><div class="showcase-flow-node showcase-human-node"><strong>03 专业人员复核</strong><small>补充背景 / 记录意见</small></div><div class="showcase-flow-node"><strong>04 过程留痕</strong><small>资料关联 / 可追溯记录</small></div></div>
        <div class="showcase-compliance-grid"><div><div class="showcase-list-heading"><strong>待关注线索</strong><span>点击查看 · 3 项示例</span></div><div class="showcase-alert-list">${yfShowAlerts.map((yfShowItem,yfShowIndex)=>`<button type="button" class="showcase-alert" data-showcase-alert="${yfShowItem.id}" aria-pressed="${yfShowItem.id===yfShowAlertId}" aria-controls="showcase-alert-detail"><span class="showcase-alert-icon" aria-hidden="true">${yfShowIndex+1}</span><span><strong>${yfShowItem.title}</strong><small>${yfShowItem.voucher} · ${yfShowItem.business}</small></span><span class="showcase-alert-arrow" aria-hidden="true">↗</span></button>`).join('')}</div><p class="showcase-inline-note">提示用于确定复核优先级，不直接形成违法、合规或税务处理结论。</p></div>
        <div id="showcase-alert-detail" class="showcase-alert-detail" aria-live="polite"><div class="showcase-detail-head"><strong>${yfShowAlert.title}</strong><span class="showcase-warning-badge">${yfShowAlert.kind} · 待复核</span></div><div class="showcase-detail-body"><div class="showcase-voucher"><div><span>示例凭证</span><strong>${yfShowAlert.voucher}</strong></div><div><span>关联业务</span><strong>${yfShowAlert.business}</strong></div><div><span>金额 / 万元</span><strong>${yfShowFormat(yfShowAlert.amount)}</strong></div></div><p class="showcase-detail-copy">${yfShowAlert.description}</p><p class="showcase-evidence-caption">关联材料</p><div class="showcase-evidence-chips">${yfShowAlert.evidence.map(yfShowItem=>`<span class="showcase-evidence-chip ${yfShowItem[1]?'':'showcase-missing'}">${yfShowItem[1]?'↗':'＋'} ${yfShowItem[0]}${yfShowItem[1]?'':' · 待补充'}</span>`).join('')}</div><p class="showcase-detail-copy">${yfShowAlert.basis}</p><div class="showcase-action-line"><strong>建议处理路线</strong>${yfShowAlert.action}</div></div></div></div>`;
    }
    function yfShowChart(yfShowData){
      const yfShowMax=Math.ceil(Math.max(...yfShowData.first,...yfShowData.second)/20)*20;
      const yfShowBase=178,yfShowHeight=142,yfShowX=38,yfShowGap=84;
      const yfShowTicks=[0,.5,1].map(yfShowFraction=>{const yfShowY=yfShowBase-yfShowHeight*yfShowFraction;return `<line x1="35" x2="548" y1="${yfShowY}" y2="${yfShowY}" stroke="#e3e9e0"/><text x="27" y="${yfShowY+4}" text-anchor="end">${yfShowMax*yfShowFraction}</text>`;}).join('');
      const yfShowBars=yfShowModel.months.map((yfShowMonth,yfShowIndex)=>{const yfShowCenter=yfShowX+yfShowIndex*yfShowGap+35;const yfShowFirstHeight=yfShowData.first[yfShowIndex]/yfShowMax*yfShowHeight;const yfShowSecondHeight=yfShowData.second[yfShowIndex]/yfShowMax*yfShowHeight;return `<rect x="${yfShowCenter-22}" y="${yfShowBase-yfShowFirstHeight}" width="19" height="${yfShowFirstHeight}" rx="3" fill="#103e36"/><rect x="${yfShowCenter+3}" y="${yfShowBase-yfShowSecondHeight}" width="19" height="${yfShowSecondHeight}" rx="3" fill="#65e2be"/><text x="${yfShowCenter}" y="201" text-anchor="middle">${yfShowMonth}</text>`;}).join('');
      return `<div class="showcase-chart-scroll"><svg class="showcase-bar-chart" viewBox="0 0 560 210" role="img" aria-labelledby="showcase-chart-title showcase-chart-description"><title id="showcase-chart-title">${yfShowData.chartTitle}，单位万元</title><desc id="showcase-chart-description">2026 年 1 至 6 月合成示例。${yfShowData.seriesNames[0]}依次为 ${yfShowData.first.join('、')}；${yfShowData.seriesNames[1]}依次为 ${yfShowData.second.join('、')}。下方可展开数据表。</desc>${yfShowTicks}${yfShowBars}</svg></div>`;
    }
    function yfShowRenderFinance(){
      const yfShowData=yfShowModel.finance(yfShowFinanceMode),yfShowColors=['#103e36','#65e2be','#a99dc9','#d8dfcb'];
      return yfShowHeader('把分散的数据，变成共同看得懂的经营视图。','连接企业业务与财务数据，在统一口径下查看变化、定位结构，支持管理者与财务、项目团队一起讨论下一步。','2026 上半年 · 单位：万元')+`
        <div class="showcase-finance-controls" role="group" aria-label="财务图表口径"><button type="button" data-showcase-finance="overview" aria-pressed="${yfShowFinanceMode==='overview'}">经营总览</button><button type="button" data-showcase-finance="research" aria-pressed="${yfShowFinanceMode==='research'}">研发投入</button></div>
        <div class="showcase-metrics" aria-live="polite">${yfShowMetric(yfShowData.mode==='overview'?'累计收入':'计划研发预算',yfShowData.totalFirst,'万元')}${yfShowMetric(yfShowData.mode==='overview'?'累计支出':'已归集研发费用',yfShowData.totalSecond,'万元')}${yfShowMetric(yfShowData.mode==='overview'?'收支差额':'预算使用比例',yfShowData.mode==='overview'?yfShowData.difference:yfShowData.percent,yfShowData.mode==='overview'?'万元':'%')}</div>
        <div class="showcase-chart-grid"><div class="showcase-chart-card"><div class="showcase-chart-head"><h4>${yfShowData.chartTitle}</h4><div class="showcase-chart-legend"><span>${yfShowData.seriesNames[0]}</span><span>${yfShowData.seriesNames[1]}</span></div></div>${yfShowChart(yfShowData)}<p class="showcase-chart-source">${yfShowData.note}</p><details class="showcase-chart-table"><summary>查看图表数据（万元）</summary><div class="showcase-chart-scroll"><table><thead><tr><th scope="col">月份</th><th scope="col">${yfShowData.seriesNames[0]}</th><th scope="col">${yfShowData.seriesNames[1]}</th></tr></thead><tbody>${yfShowModel.months.map((yfShowMonth,yfShowIndex)=>`<tr><th scope="row">${yfShowMonth}</th><td>${yfShowData.first[yfShowIndex]}</td><td>${yfShowData.second[yfShowIndex]}</td></tr>`).join('')}<tr><th scope="row">合计</th><td>${yfShowData.totalFirst}</td><td>${yfShowData.totalSecond}</td></tr></tbody></table></div></details></div><div class="showcase-chart-card"><div class="showcase-chart-head"><h4>${yfShowData.costTitle}</h4><small>合成示例</small></div><div class="showcase-cost-total"><strong>${yfShowData.costTotal}</strong><span>万元 / 共 4 类</span></div><div class="showcase-cost-stack" aria-hidden="true">${yfShowData.costs.map((yfShowCost,yfShowIndex)=>`<span style="width:${yfShowCost[1]/yfShowData.costTotal*100}%;background:${yfShowColors[yfShowIndex]}"></span>`).join('')}</div><ul class="showcase-cost-list">${yfShowData.costs.map((yfShowCost,yfShowIndex)=>`<li><span class="showcase-cost-swatch" style="background:${yfShowColors[yfShowIndex]}" aria-hidden="true"></span><span>${yfShowCost[0]}</span><strong>${yfShowCost[1]}</strong><small>${(yfShowCost[1]/yfShowData.costTotal*100).toFixed(1)}%</small></li>`).join('')}</ul></div></div>`;
    }
    function yfShowRenderProjects(){
      const yfShowProject=yfShowModel.project(yfShowProjectId);
      return yfShowHeader('项目进度与研发费用，在同一条线上。','围绕高企培育与研发项目管理，连接任务、里程碑、研发活动和费用材料，让技术进展与财务归集相互对应。','项目 × 进度 × 费用 × 材料')+`
        <div class="showcase-project-picker"><label for="showcase-project-select">选择一个合成示例项目</label><select id="showcase-project-select" data-showcase-project>${yfShowProjects.map(yfShowItem=>`<option value="${yfShowItem.id}"${yfShowItem.id===yfShowProjectId?' selected':''}>${yfShowItem.id} · ${yfShowItem.name}</option>`).join('')}</select></div>
        <div class="showcase-metrics" aria-live="polite">${yfShowMetric('项目计划预算',yfShowProject.budget,'万元')}${yfShowMetric('累计已归集费用',yfShowProject.collected,'万元')}${yfShowMetric('已完成里程碑',yfShowProject.completed,'/ '+yfShowProject.totalMilestones)}</div><p class="showcase-inline-note">以上预算与费用均为项目管理口径的示例数据。</p>
        <div class="showcase-project-grid"><div class="showcase-project-card"><div class="showcase-chart-head"><h4>研发项目进度</h4><small>${yfShowProject.dates}</small></div><ol class="showcase-milestones">${yfShowProject.milestones.map((yfShowMilestone,yfShowIndex)=>`<li><span class="showcase-milestone-dot ${yfShowMilestone[1]==='已完成'?'showcase-complete':yfShowMilestone[1]==='进行中'?'showcase-active':''}" aria-hidden="true">${yfShowMilestone[1]==='已完成'?'✓':yfShowIndex+1}</span><div><strong>${yfShowMilestone[0]}</strong><small>${yfShowMilestone[2]}</small></div><span class="showcase-milestone-state">${yfShowMilestone[1]}</span></li>`).join('')}</ol></div><div class="showcase-project-card"><h4>阶段材料与费用关联</h4><ul class="showcase-materials">${yfShowProject.materials.map(yfShowMaterial=>`<li><span aria-hidden="true">▧</span><span>${yfShowMaterial[0]}</span><small>${yfShowMaterial[1]}</small></li>`).join('')}</ul><div class="showcase-link-record"><p class="showcase-evidence-caption">一条可回看的材料关系</p><strong>${yfShowEsc(yfShowProject.record)}</strong><p>${yfShowProject.recordNote}</p></div><p class="showcase-inline-note">当前预算使用 ${yfShowProject.budgetUsed}%。阶段材料随项目推进完善，进度状态不代表认定结果。</p></div></div>
        <p class="showcase-scope-note">同一项目的会计核算、高新技术企业认定与研发费用加计扣除，应按各自适用口径归集并保留调整依据。此处展示项目与资料协同方式，示例费用不直接等同于认定或税收优惠可用金额。</p>`;
    }
    function yfShowRender(yfShowFocusSelector){
      yfShowPanel.innerHTML=yfShowScene==='finance'?yfShowRenderFinance():yfShowScene==='projects'?yfShowRenderProjects():yfShowRenderCompliance();
      yfShowPanel.setAttribute('aria-labelledby','showcase-tab-'+yfShowScene);
      yfShowTabs.forEach(yfShowTab=>{const yfShowActive=yfShowTab.dataset.showcaseScene===yfShowScene;yfShowTab.setAttribute('aria-selected',String(yfShowActive));yfShowTab.tabIndex=yfShowActive?0:-1;});
      if(yfShowFocusSelector){const yfShowFocus=yfShowPanel.querySelector(yfShowFocusSelector);if(yfShowFocus)yfShowFocus.focus({preventScroll:true});}
    }
    yfShowTabs.forEach((yfShowTab,yfShowIndex)=>{
      yfShowTab.addEventListener('click',()=>{yfShowScene=yfShowTab.dataset.showcaseScene;yfShowRender();});
      yfShowTab.addEventListener('keydown',yfShowEvent=>{let yfShowNext=yfShowIndex;if(yfShowEvent.key==='ArrowRight')yfShowNext=(yfShowIndex+1)%yfShowTabs.length;else if(yfShowEvent.key==='ArrowLeft')yfShowNext=(yfShowIndex+yfShowTabs.length-1)%yfShowTabs.length;else if(yfShowEvent.key==='Home')yfShowNext=0;else if(yfShowEvent.key==='End')yfShowNext=yfShowTabs.length-1;else return;yfShowEvent.preventDefault();yfShowScene=yfShowTabs[yfShowNext].dataset.showcaseScene;yfShowRender();yfShowTabs[yfShowNext].focus();});
    });
    yfShowPanel.addEventListener('click',yfShowEvent=>{
      const yfShowAlertButton=yfShowEvent.target.closest('[data-showcase-alert]');
      if(yfShowAlertButton){yfShowAlertId=yfShowAlertButton.dataset.showcaseAlert;yfShowRender(`[data-showcase-alert="${yfShowAlertId}"]`);return;}
      const yfShowFinanceButton=yfShowEvent.target.closest('[data-showcase-finance]');
      if(yfShowFinanceButton){yfShowFinanceMode=yfShowFinanceButton.dataset.showcaseFinance;yfShowRender(`[data-showcase-finance="${yfShowFinanceMode}"]`);}
    });
    yfShowPanel.addEventListener('change',yfShowEvent=>{if(yfShowEvent.target.matches('[data-showcase-project]')){yfShowProjectId=yfShowEvent.target.value;yfShowRender('[data-showcase-project]');}});
    yfShowGlobal.addEventListener('yifang:scene',yfShowEvent=>{const yfShowMapped={compliance:'compliance',finance:'finance',rd:'projects',projects:'projects'}[yfShowEvent.detail];if(yfShowMapped){yfShowScene=yfShowMapped;yfShowRender();}});
    yfShowRender();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',yfShowInit,{once:true});else yfShowInit();
})(typeof globalThis!=='undefined'?globalThis:window);
